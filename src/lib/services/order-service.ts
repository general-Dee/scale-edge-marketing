import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface Order {
  id: string
  customer_id: string
  items: any[]
  total_amount: number
  shipping_address: string
  shipping_method: string
  shipping_fee: number
  payment_status: 'pending' | 'paid' | 'failed'
  payment_intent_id?: string
  payment_reference?: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paid_at?: string
  created_at: string
  customer?: {
    id: string
    email: string
    first_name: string
    last_name: string
    phone: string
  }
}

/**
 * Fetch all orders (admin only). Includes customer details.
 */
export const getOrders = cache(async (): Promise<Order[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*, customer:customers(*)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }
  return data as Order[]
})

/**
 * Fetch a single order by ID (admin or customer).
 * If customer, they can only view their own orders (handled by RLS).
 */
export const getOrderById = cache(async (id: string): Promise<Order | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*, customer:customers(*)')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching order by id:', error)
    return null
  }
  return data as Order | null
})

/**
 * Fetch all orders for a specific customer (for account page).
 */
export const getOrdersByCustomer = cache(async (customerId: string): Promise<Order[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders by customer:', error)
    return []
  }
  return data as Order[]
})