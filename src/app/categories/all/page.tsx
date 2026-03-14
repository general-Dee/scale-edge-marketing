"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts } from '@/lib/services/product-service.client';
import { categories, getCategoryIcon } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { PageTemplate } from "@/components/page-template";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";
import { ErrorBoundary } from "@/components/error-boundary";

export default function AllProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <PageTemplate fallback={<ProductGridSkeleton count={8} />}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-8 animate-pulse">
              <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 sm:w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 sm:w-96"></div>
            </div>
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-12">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg">Retry</button>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center text-sm mb-6 sm:mb-8">
              <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link href="/categories" className="text-gray-500 hover:text-orange-600">Categories</Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900 dark:text-white">All Products</span>
            </nav>

            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">All Products</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Browse our complete collection of {products.length} premium products</p>
            </div>

            {/* Category filter chips */}
            <div className="mb-6 sm:mb-8 flex flex-wrap gap-2">
              <Link href="/categories/all" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-600 text-white rounded-full text-xs sm:text-sm font-semibold">
                All Products
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="mr-1">{cat.icon}</span> {cat.name}
                </Link>
              ))}
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </PageTemplate>
  );
}