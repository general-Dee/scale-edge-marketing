import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface Customer {
  id: string
  user_id?: string
  email: string
  first_name: string
  last_name: string
  phone: string
  created_at: string
}

/**
 * Fetch all customers (admin only – RLS must allow admins to view all).
 */
export const getCustomers = cache(async (): Promise<Customer[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }
  return data as Customer[]
})

/**
 * Fetch a single customer by ID (admin or the customer themselves).
 */
export const getCustomerById = cache(async (id: string): Promise<Customer | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching customer by id:', error)
    return null
  }
  return data as Customer | null
})

/**
 * Fetch the currently logged-in customer's profile.
 * Returns null if no user or no customer record.
 */
export const getCurrentCustomer = cache(async (): Promise<Customer | null> => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching current customer:', error)
    return null
  }
  return data as Customer | null
})