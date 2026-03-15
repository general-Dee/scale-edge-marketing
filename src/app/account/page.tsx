import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentCustomer } from '@/lib/services/customer-service'
import { getOrdersByCustomer } from '@/lib/services/order-service'
import type { Order } from '@/lib/services/order-service'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let customer = null
  let orders: Order[] = []
  let error = null

  try {
    customer = await getCurrentCustomer()
    if (customer) {
      orders = await getOrdersByCustomer(customer.id)
    }
  } catch (err) {
    console.error('Error loading account data:', err)
    error = 'Failed to load account data. Please try again later.'
  }

  if (!customer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Voltream!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your account is ready, but we need a few more details to complete your profile.
          </p>
          <Link href="/account/profile" className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            Complete Your Profile
          </Link>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg">Retry</button>
        </div>
      </div>
    )
  }

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <nav className="space-y-2">
              <Link href="/account" className="block px-3 py-2 rounded-md bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 font-medium">Dashboard</Link>
              <Link href="/account/orders" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Orders</Link>
              <Link href="/account/profile" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Profile</Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">Sign out</button>
              </form>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Welcome back, {customer.first_name}!</h2>
            <p className="text-gray-600 dark:text-gray-400">{customer.email} · {customer.phone}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent orders</h2>
              <Link href="/account/orders" className="text-sm text-orange-600 hover:underline">View all →</Link>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link key={order.id} href={`/account/orders/${order.id}`} className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(order.created_at).toLocaleDateString()} · {order.items?.length || 0} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">₦{order.total_amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{order.status}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}