import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Double‑check admin status (already done in middleware, but safe)
  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!admin) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/admin" className="flex items-center px-2 py-2 text-gray-900 dark:text-white font-bold">
                Admin Dashboard
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/admin/products" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-white">
                  Products
                </Link>
                <Link href="/admin/orders" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-white">
                  Orders
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <form action="/auth/signout" method="post">
                <button type="submit" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}