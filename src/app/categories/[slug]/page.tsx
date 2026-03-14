"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/services/product-service";
import { categories, getCategoryIcon, getCategoryColor } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { PageTemplate } from "@/components/page-template";
import { ProductGridSkeleton } from "@/components/skeletons/product-grid-skeleton";
import { ErrorBoundary } from "@/components/error-boundary";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<typeof categories[0] | undefined>();

  useEffect(() => {
    const found = categories.find(c => c.slug === slug);
    setCategory(found);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryName = found?.name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const data = await getProductsByCategory(categoryName);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <PageTemplate fallback={<ProductGridSkeleton count={8} />}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8 animate-pulse"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              </div>
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg">Retry</button>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  const categoryName = category?.name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <PageTemplate>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex mb-8 text-sm">
              <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link href="/categories" className="text-gray-500 hover:text-orange-600">Categories</Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900 dark:text-white">{categoryName}</span>
            </nav>
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-orange-600`}>
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 ${getCategoryColor(categoryName)} rounded-full flex items-center justify-center text-4xl`}>
                  {getCategoryIcon(categoryName)}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{categoryName}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{products.length} products available</p>
                </div>
              </div>
            </div>
            {products.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                <p className="text-gray-600 dark:text-gray-400">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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