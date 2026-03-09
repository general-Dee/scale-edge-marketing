import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createAdminClient()
  
  // Look up the user by email (since we know the email)
  const { data: admin, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', 'oshinowodre@gmail.com')
    .maybeSingle()

  return NextResponse.json({
    admin,
    error: error?.message
  })
}