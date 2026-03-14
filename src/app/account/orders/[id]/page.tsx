import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOrderById } from '@/lib/services/order-service'
import { getCurrentCustomer } from '@/lib/services/customer-service'

export const dynamic = 'force-dynamic'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const customer = await getCurrentCustomer()
  if (!customer) {
    redirect('/account')
  }

  const order = await getOrderById(params.id)

  // Ensure the order belongs to the current customer
  if (!order || order.customer_id !== customer.id) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/account/orders" className="text-orange-600 hover:underline">
          ← Back to orders
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Order #{order.id.slice(0, 8)}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Items</h2>
            <div className="space-y-4">
              {order.items?.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center border-b dark:border-gray-700 pb-4 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-orange-600">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping address</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{order.shipping_address}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 capitalize">Method: {order.shipping_method}</p>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">₦{(order.total_amount - order.shipping_fee).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">₦{order.shipping_fee.toLocaleString()}</span>
              </div>
              <div className="border-t dark:border-gray-700 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-orange-600 text-xl">₦{order.total_amount.toLocaleString()}</span>
              </div>
              <div className="pt-4">
                <p className={`text-sm font-medium ${
                  order.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  Payment: {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                </p>
                <p className={`text-sm font-medium mt-1 capitalize ${
                  order.status === 'delivered' ? 'text-green-600' :
                  order.status === 'cancelled' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  Status: {order.status}
                </p>
                {order.paid_at && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Paid on {new Date(order.paid_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}