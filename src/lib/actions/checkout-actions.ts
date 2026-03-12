'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const checkoutSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  shipping_method: z.enum(['standard', 'express']),
  cart: z.string().transform(str => JSON.parse(str)),
  total: z.coerce.number(),
})

export async function createOrder(formData: FormData) {
  const supabase = await createClient() // for user context if needed
  const admin = createAdminClient()

  const rawData = {
    email: formData.get('email'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    city: formData.get('city'),
    state: formData.get('state'),
    shipping_method: formData.get('shipping_method'),
    cart: formData.get('cart'),
    total: parseFloat(formData.get('total') as string),
  }

  const parsed = checkoutSchema.parse(rawData)

  // Calculate shipping
  const shippingFee = parsed.shipping_method === 'express' ? 3000 : 1500
  const cartItems = parsed.cart

  // Upsert customer
  const { data: customer, error: customerError } = await admin
    .from('customers')
    .upsert({
      email: parsed.email,
      first_name: parsed.first_name,
      last_name: parsed.last_name,
      phone: parsed.phone,
    })
    .select()
    .single()

  if (customerError) throw customerError

  // Create order
  const { data: order, error: orderError } = await admin
    .from('orders')
    .insert({
      customer_id: customer.id,
      items: cartItems,
      total_amount: parsed.total + shippingFee,
      shipping_address: `${parsed.address}, ${parsed.city}, ${parsed.state}`,
      shipping_method: parsed.shipping_method,
      shipping_fee: shippingFee,
      payment_status: 'pending',
      status: 'pending',
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Initialize Paystack
  const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: parsed.email,
      amount: (parsed.total + shippingFee) * 100,
      reference: `order_${order.id}_${Date.now()}`,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      metadata: { order_id: order.id, customer_id: customer.id },
    }),
  })

  const paystackData = await paystackResponse.json()

  if (!paystackData.status) {
    throw new Error('Failed to initialize payment')
  }

  // Save payment intent reference
  await admin
    .from('orders')
    .update({ payment_intent_id: paystackData.data.reference })
    .eq('id', order.id)

  redirect(paystackData.data.authorization_url)
}