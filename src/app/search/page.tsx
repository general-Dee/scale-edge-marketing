import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoryIcon } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Search</h1>
        <p className="text-gray-600 dark:text-gray-400">Enter a search term to find products.</p>
      </div>
    )
  }

  const supabase = await createClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Search error:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Search</h1>
        <p className="text-red-600">An error occurred. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Search results for "{query}"
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {products.length} product{products.length !== 1 ? 's' : ''} found
      </p>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden block"
            >
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-8 overflow-hidden">
                {product.image_urls?.[0] ? (
                  <Image
                    src={product.image_urls[0]}
                    alt={product.name}
                    fill
                    className="object-contain transform group-hover:scale-110 transition-transform"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                ) : (
                  <span className="text-6xl">{getCategoryIcon(product.category)}</span>
                )}
                {product.compare_at_price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({product.review_count})</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.compare_at_price && (
                    <span className="text-sm text-gray-400 line-through">
                      ₦{product.compare_at_price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}