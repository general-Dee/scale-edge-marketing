'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { checkoutSchema } from '@/lib/validators/schemas'

export async function createOrder(formData: FormData) {
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

  // Updated shipping fees
  const shippingFee = parsed.shipping_method === 'express' ? 10000 : 6000
  const cartItems = parsed.cart

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

  const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: parsed.email,
      amount: Math.round((parsed.total + shippingFee) * 100),
      reference: `order_${order.id}_${Date.now()}`,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
      metadata: { order_id: order.id, customer_id: customer.id },
    }),
  })

  const paystackData = await paystackResponse.json()

  if (!paystackData.status) {
    throw new Error('Failed to initialize payment')
  }

  await admin
    .from('orders')
    .update({ payment_intent_id: paystackData.data.reference })
    .eq('id', order.id)

  redirect(paystackData.data.authorization_url)
}