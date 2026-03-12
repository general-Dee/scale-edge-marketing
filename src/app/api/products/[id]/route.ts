import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      }
      console.error('API product by id error:', error)
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('API product by id error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}