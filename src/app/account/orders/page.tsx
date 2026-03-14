import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentCustomer } from '@/lib/services/customer-service'
import { getOrdersByCustomer } from '@/lib/services/order-service'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const customer = await getCurrentCustomer()
  if (!customer) {
    redirect('/account')
  }

  const orders = await getOrdersByCustomer(customer.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <nav className="space-y-2">
              <Link href="/account" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                Dashboard
              </Link>
              <Link href="/account/orders" className="block px-3 py-2 rounded-md bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 font-medium">
                Orders
              </Link>
              <Link href="/account/profile" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                Profile
              </Link>
              <form action="/auth/signout" method="post">
                <button type="submit" className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                  Sign out
                </button>
              </form>
            </nav>
          </div>
        </div>

        {/* Orders list */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {orders.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">You haven't placed any orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex flex-wrap justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">₦{order.total_amount.toLocaleString()}</p>
                        <p className={`text-sm capitalize ${
                          order.status === 'delivered' ? 'text-green-600' :
                          order.status === 'cancelled' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      {order.items?.length || 0} items · {order.shipping_method} shipping
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