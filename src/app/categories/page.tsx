"use client";

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, getProductsByCategory } from "@/lib/products";
import { PageTemplate } from "@/components/page-template";
import { CategoryCardSkeleton } from "@/components/skeletons";

export default function CategoriesPage() {
  const [categoryData, setCategoryData] = useState<Array<{ name: string; icon: string; count: number; products: any[] }>>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate data fetching
    const timer = setTimeout(() => {
      const data = categories.map(cat => ({
        ...cat,
        products: getProductsByCategory(cat.name)
      }));
      setCategoryData(data);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getCategoryGradient = (categoryName: string) => {
    const gradients: Record<string, string> = {
      "Phones": "from-blue-500 to-blue-600",
      "Tablets": "from-purple-500 to-purple-600",
      "Speakers": "from-indigo-500 to-indigo-600",
      "Earpieces": "from-pink-500 to-pink-600",
      "Smart Watches": "from-cyan-500 to-cyan-600",
      "Solar Essentials": "from-orange-500 to-orange-600",
      "Skincare": "from-green-500 to-green-600",
      "Home Solutions": "from-gray-500 to-gray-600"
    };
    return gradients[categoryName] || "from-orange-500 to-orange-600";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTemplate fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse our curated collection across 8 categories with over 30 premium products
            </p>
          </div>

          {/* Categories Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryData.map((category) => (
                <Link
                  key={category.name}
                  href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 block"
                >
                  <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(category.name)} flex items-center justify-center`}>
                    <span className="text-7xl transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.products.length} products available
                    </p>
                    <div className="flex items-center text-orange-600 font-semibold">
                      Shop Now
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Category Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">32+</div>
              <div className="text-gray-600 dark:text-gray-400">Total Products</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
              <div className="text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">6+</div>
              <div className="text-gray-600 dark:text-gray-400">Top Brands</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}