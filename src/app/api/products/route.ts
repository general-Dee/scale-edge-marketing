import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')

    const supabase = await createClient()
    let query = supabase.from('products').select('*')

    if (category) {
      query = query.eq('category', category)
    }
    if (limit) {
      query = query.limit(parseInt(limit))
    }
    if (offset) {
      query = query.range(parseInt(offset), parseInt(offset) + (parseInt(limit || '10') - 1))
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('API products error:', error)
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('API products error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}