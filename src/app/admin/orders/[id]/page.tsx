import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import OrderStatusForm from './OrderStatusForm'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!order) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Order #{order.order_number}</h1>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Customer Details</h3>
            <p className="text-gray-600 dark:text-gray-400">Name: {order.guest_name || 'N/A'}</p>
            <p className="text-gray-600 dark:text-gray-400">Email: {order.guest_email}</p>
            <p className="text-gray-600 dark:text-gray-400">Phone: {order.guest_phone || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Shipping Address</h3>
            <p className="text-gray-600 dark:text-gray-400">{order.shipping_address.address}</p>
            <p className="text-gray-600 dark:text-gray-400">{order.shipping_address.city}, {order.shipping_address.state}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Order Items</h3>
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Product</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Quantity</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: any, idx: number) => (
                <tr key={idx} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2 text-gray-900 dark:text-white">{item.name}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{item.quantity}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">₦{item.price.toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">₦{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Subtotal: ₦{order.subtotal.toLocaleString()}</p>
            <p className="text-gray-600 dark:text-gray-400">Shipping: ₦{order.shipping_cost.toLocaleString()}</p>
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">Total: ₦{order.total.toLocaleString()}</p>
          </div>
          <OrderStatusForm orderId={order.id} currentStatus={order.order_status} />
        </div>
      </div>
    </div>
  )
}