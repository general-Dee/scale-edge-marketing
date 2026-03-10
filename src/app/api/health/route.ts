import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Try to connect to Supabase and run a minimal query
    const supabase = await createClient()
    const { error } = await supabase.from('products').select('id').limit(1)

    if (error) {
      console.error('Health check failed:', error)
      return NextResponse.json(
        { status: 'error', message: 'Database query failed' },
        { status: 500 }
      )
    }

    // If everything is fine, return a 200 OK
    return NextResponse.json(
      { status: 'ok', timestamp: new Date().toISOString() },
      { status: 200 }
    )

  } catch (err) {
    console.error('Health check exception:', err)
    return NextResponse.json(
      { status: 'error', message: 'Internal server error' },
      { status: 500 }
    )
  }
}