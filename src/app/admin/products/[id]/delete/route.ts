import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient()
  await supabase.from('products').delete().eq('id', params.id)
  return NextResponse.redirect(new URL('/admin/products', req.url))
}