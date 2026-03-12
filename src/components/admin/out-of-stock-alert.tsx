import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export async function OutOfStockAlert() {
  const supabase = await createClient()
  
  // Fetch products with stock = 0 (out of stock)
  const { data: outOfStockProducts, error } = await supabase
    .from('products')
    .select('id, name, category, stock')
    .eq('stock', 0)  // exactly zero
    .limit(10)

  if (error) {
    console.error('Error fetching out-of-stock products:', error)
    return null
  }

  if (!outOfStockProducts || outOfStockProducts.length === 0) {
    return null // hide if no out-of-stock items
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="mr-2">⚠️</span> Out of Stock Products
      </h2>
      <div className="space-y-3">
        {outOfStockProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div>
              <Link href={`/admin/products/${product.id}`} className="font-medium text-gray-900 dark:text-white hover:underline">
                {product.name}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Category: {product.category} · Stock: {product.stock}
              </p>
            </div>
            <Link href={`/admin/products/${product.id}`} className="text-sm text-orange-600 hover:underline">
              Update →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}