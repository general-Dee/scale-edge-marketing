'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCustomerProfile } from '@/lib/actions/customer-actions'

interface ProfileFormProps {
  customer: {
    id: string
    first_name: string
    last_name: string
    phone: string
    email: string
  }
}

export function ProfileForm({ customer }: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    try {
      await updateCustomerProfile(formData)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      router.refresh()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First name
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            defaultValue={customer.first_name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Last name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            defaultValue={customer.last_name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            defaultValue={customer.phone}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={customer.email}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>
      </div>

      {message && (
        <div className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save changes'}
      </button>
    </form>
  )
}