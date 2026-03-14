'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/products";
import { getProductsByCategory } from "@/lib/services/product-service.client"; // ✅ correct import
import { CategoryCardSkeleton } from "@/components/skeletons";

export default function CategoriesContent() {
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      const counts: { [key: string]: number } = {};
      for (const cat of categories) {
        const products = await getProductsByCategory(cat.name);
        counts[cat.slug] = products.length;
      }
      setCategoryData(counts);
      setLoading(false);
    };
    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 7 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div className={`h-48 bg-gradient-to-br from-${category.slug}-500 to-${category.slug}-600 flex items-center justify-center`}>
              <span className="text-7xl transform group-hover:scale-110 transition-transform">
                {category.icon}
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {categoryData[category.slug] || 0} products
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
    </div>
  );
}