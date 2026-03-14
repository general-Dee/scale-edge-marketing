import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentCustomer } from '@/lib/services/customer-service'
import { ProfileForm } from '@/components/account/profile-form'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const customer = await getCurrentCustomer()
  if (!customer) {
    redirect('/account')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <nav className="space-y-2">
              <Link href="/account" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                Dashboard
              </Link>
              <Link href="/account/orders" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                Orders
              </Link>
              <Link href="/account/profile" className="block px-3 py-2 rounded-md bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 font-medium">
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

        {/* Profile form */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Edit profile</h2>
            <ProfileForm customer={customer} />
          </div>
        </div>
      </div>
    </div>
  )
}