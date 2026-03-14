'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories, getCategoryIcon } from '@/lib/products';
import { getProducts } from '@/lib/services/product-service.client'; // ✅ correct import
import { ProductGridSkeleton } from '@/components/skeletons';

export default function AllProductsContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <ProductGridSkeleton count={8} />;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Products</h1>
      
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/categories/all" className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold">
          All Products
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Product grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                {product.image_urls?.[0] ? (
                  <Image
                    src={product.image_urls[0]}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    {getCategoryIcon(product.category)}
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-orange-600 font-semibold">{product.brand}</p>
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{product.name}</h3>
                <p className="text-xl font-bold text-orange-600 mt-2">₦{product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}