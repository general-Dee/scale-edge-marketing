'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { productSchema } from '@/lib/validators/schemas'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const rawData = Object.fromEntries(formData)
  const parsed = productSchema.parse(rawData)

  const admin = createAdminClient()
  const { error } = await admin.from('products').insert({
    ...parsed,
    rating: 0,
    review_count: 0,
    specifications: {},
  })

  if (error) throw error
  revalidatePath('/admin/products')
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const rawData = Object.fromEntries(formData)
  const parsed = productSchema.parse(rawData)

  const admin = createAdminClient()
  const { error } = await admin.from('products').update(parsed).eq('id', id)

  if (error) throw error
  revalidatePath('/admin/products')
  revalidatePath(`/products/${id}`)
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const admin = createAdminClient()
  const { error } = await admin.from('products').delete().eq('id', id)

  if (error) throw error
  revalidatePath('/admin/products')
}