'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const orderUpdateSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
})

export async function updateOrderStatus(orderId: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const status = formData.get('status')
  const parsed = orderUpdateSchema.parse({ status })

  const admin = createAdminClient()
  const { error } = await admin
    .from('orders')
    .update({ status: parsed.status })
    .eq('id', orderId)

  if (error) throw error
  revalidatePath('/admin/orders')
  revalidatePath(`/admin/orders/${orderId}`)
}