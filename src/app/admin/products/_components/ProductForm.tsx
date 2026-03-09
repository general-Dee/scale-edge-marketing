'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductFormProps {
  initialData?: any
  onSubmit: (formData: FormData) => Promise<void>
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await onSubmit(formData)
    setLoading(false)
    router.push('/admin/products')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
          <input
            type="text"
            name="brand"
            defaultValue={initialData?.brand}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price (₦)</label>
          <input
            type="number"
            name="price"
            defaultValue={initialData?.price}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Compare At Price (₦)</label>
          <input
            type="number"
            name="compare_at_price"
            defaultValue={initialData?.compare_at_price}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
          <select
            name="category"
            defaultValue={initialData?.category}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          >
            <option value="Phones">Phones</option>
            <option value="Tablets">Tablets</option>
            <option value="Speakers">Speakers</option>
            <option value="Earpieces">Earpieces</option>
            <option value="Smart Watches">Smart Watches</option>
            <option value="Solar Essentials">Solar Essentials</option>
            <option value="Skincare">Skincare</option>
            <option value="Home Solutions">Home Solutions</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Stock</label>
          <input
            type="number"
            name="stock"
            defaultValue={initialData?.in_stock ? 1 : 0}
            min="0"
            max="1"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">1 = in stock, 0 = out of stock</p>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={initialData?.description}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URLs (one per line)</label>
          <textarea
            name="image_urls"
            rows={3}
            defaultValue={initialData?.image_urls?.join('\n')}
            placeholder="/images/products/.../1.jpg"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features (one per line)</label>
          <textarea
            name="features"
            rows={3}
            defaultValue={initialData?.features?.join('\n')}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specifications (JSON format)</label>
          <textarea
            name="specifications"
            rows={4}
            defaultValue={initialData?.specifications ? JSON.stringify(initialData.specifications, null, 2) : ''}
            placeholder='{"Display": "6.7-inch", "Chip": "A17 Pro"}'
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 font-mono text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            defaultValue={initialData?.tags?.join(', ')}
            placeholder="bestseller, apple, iphone"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2"
          />
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  )
}