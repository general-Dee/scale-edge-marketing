import { NextResponse } from 'next/server'

export async function GET() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Missing service role key' }, { status: 500 })
  }

  try {
    const functionUrl = 'https://zkuyedhavjlgsmthbjyt.supabase.co/functions/v1/low-stock-alert'
    const response = await fetch(functionUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
      },
    })

    const responseText = await response.text()
    console.log('Function status:', response.status)
    console.log('Function response:', responseText)

    if (!response.ok) {
      return NextResponse.json(
        { error: responseText, status: response.status },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: responseText })
  } catch (err: any) {
    console.error('Fetch error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}