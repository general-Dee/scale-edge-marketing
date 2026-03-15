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

export const getCustomers = cache(async (): Promise<Customer[]> => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('customers').select('*').order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching customers:', error)
    return []
  }
  return data as Customer[]
})

export const getCustomerById = cache(async (id: string): Promise<Customer | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('customers').select('*').eq('id', id).maybeSingle()
  if (error) {
    console.error('Error fetching customer by id:', error)
    return null
  }
  return data as Customer | null
})

export const getCurrentCustomer = cache(async (): Promise<Customer | null> => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  let { data, error } = await supabase.from('customers').select('*').eq('user_id', user.id).maybeSingle()
  if (error) {
    console.error('Error fetching current customer:', error)
    return null
  }
  if (data) return data as Customer

  // If not found by user_id, try to find by email (guest customer)
  const { data: emailMatch, error: emailError } = await supabase.from('customers').select('*').eq('email', user.email).maybeSingle()
  if (emailError) {
    console.error('Error fetching customer by email:', emailError)
    return null
  }
  if (emailMatch) {
    // Link guest customer to this user
    const { error: updateError } = await supabase.from('customers').update({ user_id: user.id }).eq('id', emailMatch.id)
    if (updateError) {
      console.error('Error linking customer to user:', updateError)
      return null
    }
    return { ...emailMatch, user_id: user.id } as Customer
  }
  return null
})