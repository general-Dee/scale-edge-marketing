import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentOrders } from '@/components/admin/recent-orders'
import { OutOfStockAlert } from '@/components/admin/out-of-stock-alert' // fixed name, no extension

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: admin } = await supabase
    .from('admins')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!admin) {
    redirect('/')
  }

  const [
    { count: productsCount },
    { count: ordersCount },
    { count: customersCount },
    { data: recentOrders }
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase
      .from('orders')
      .select('*, customer:customers(*)')
      .order('created_at', { ascending: false })
      .limit(5)
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      <DashboardStats
        productsCount={productsCount || 0}
        ordersCount={ordersCount || 0}
        customersCount={customersCount || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders orders={recentOrders || []} />
        <OutOfStockAlert />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Link href="/admin/products/new" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Add Product</h2>
          <p className="text-gray-600 dark:text-gray-400">Create a new product listing</p>
          <span className="mt-4 inline-block text-orange-600">→</span>
        </Link>
        <Link href="/admin/orders" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Manage Orders</h2>
          <p className="text-gray-600 dark:text-gray-400">View and update order status</p>
          <span className="mt-4 inline-block text-orange-600">→</span>
        </Link>
        <Link href="/admin/customers" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">View Customers</h2>
          <p className="text-gray-600 dark:text-gray-400">See all registered customers</p>
          <span className="mt-4 inline-block text-orange-600">→</span>
        </Link>
      </div>
    </div>
  )
}