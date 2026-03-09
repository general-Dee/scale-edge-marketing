import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Optional: double-check admin status
  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!admin) {
    redirect('/')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your product catalog</p>
          <a href="/admin/products" className="mt-4 inline-block text-orange-600 hover:underline">View Products →</a>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-gray-600 dark:text-gray-400">View and update orders</p>
          <a href="/admin/orders" className="mt-4 inline-block text-orange-600 hover:underline">View Orders →</a>
        </div>
      </div>
    </div>
  )
}