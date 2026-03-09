import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createAdminClient()
  
  // Find the first admin user (you)
  const { data: admin } = await supabase
    .from('admins')
    .select('user_id, email')
    .limit(1)
    .single()

  if (!admin) {
    return NextResponse.json({ error: 'No admin found' }, { status: 404 })
  }

  // Generate a magic link for this user
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: admin.email,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    message: 'Use this link to log in (valid for 24h)',
    link: data.properties?.action_link,
  })
}