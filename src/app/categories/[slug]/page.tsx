"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { products, getProductsByCategory, categories } from "@/lib/products";

export const dynamic = 'force-dynamic';

// Main page component with Suspense
export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading category...</p>
        </div>
      </div>
    }>
      <CategoryContent />
    </Suspense>
  );
}

// Component that uses useParams
function CategoryContent() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Convert slug back to category name (e.g., "solar-essentials" -> "Solar Essentials")
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const categoryProducts = getProductsByCategory(categoryName);
  const category = categories.find(c => c.name === categoryName);

  if (!category || categoryProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The category you're looking for doesn't exist.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/categories" className="text-gray-500 hover:text-orange-600">Categories</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {categoryProducts.length} products available
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => {
              const discount = product.compareAtPrice 
                ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                : 0;

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-8">
                    <span className="text-6xl transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    {discount > 0 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{discount}%
                      </div>
                    )}
                    {product.tags.includes("bestseller") && (
                      <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                        BESTSELLER
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-orange-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₦{product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors">
                      View Product
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
            <p className="text-gray-600 dark:text-gray-400">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}