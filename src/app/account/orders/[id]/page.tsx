import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the order ensuring it belongs to the logged‑in user
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, customer:customers!inner(*)')
    .eq('id', params.id)
    .eq('customer.auth_id', user.id)
    .single();

  if (error || !order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/account" className="text-orange-600 hover:underline mb-4 inline-block">
          ← Back to Account
        </Link>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Order #{order.order_number}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Status</h2>
              <p className="text-gray-600 dark:text-gray-400 capitalize">{order.order_status}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Payment</h2>
              <p className="text-gray-600 dark:text-gray-400 capitalize">{order.payment_status}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Shipping Address</h2>
              <p className="text-gray-600 dark:text-gray-400">{order.shipping_address.address}</p>
              <p className="text-gray-600 dark:text-gray-400">{order.shipping_address.city}, {order.shipping_address.state}</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Items</h2>
          <div className="space-y-4">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-orange-600">₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-lg">
              <span className="font-medium text-gray-900 dark:text-white">Subtotal</span>
              <span className="text-gray-900 dark:text-white">₦{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg mt-2">
              <span className="font-medium text-gray-900 dark:text-white">Shipping</span>
              <span className="text-gray-900 dark:text-white">₦{order.shipping_cost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-gray-900 dark:text-white">Total</span>
              <span className="text-orange-600">₦{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}