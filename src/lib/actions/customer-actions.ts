'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateCustomerProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const updates = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    phone: formData.get('phone'),
  }

  // Check if customer record exists
  const { data: existing } = await supabase
    .from('customers')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  let error
  if (existing) {
    // Update existing
    const result = await supabase
      .from('customers')
      .update(updates)
      .eq('user_id', user.id)
    error = result.error
  } else {
    // Insert new
    const result = await supabase
      .from('customers')
      .insert({
        ...updates,
        user_id: user.id,
        email: user.email,
      })
    error = result.error
  }

  if (error) throw error
  revalidatePath('/account')
}