import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from './actions';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch customer record from your `customers` table
  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('auth_id', user.id)
    .single();

  // Fetch user's orders (join with customers table)
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', customer?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Account</h1>
          <form action={signOut}>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Profile</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Name:</strong> {customer?.first_name} {customer?.last_name}
            </p>
            {/* Future: edit profile link */}
          </div>

          {/* Orders Section */}
          <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Orders</h2>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.id}`}
                    className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Order #{order.order_number}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-orange-600">₦{order.total.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{order.order_status}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No orders yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}