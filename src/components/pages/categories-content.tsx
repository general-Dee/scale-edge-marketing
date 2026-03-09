"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { categories, getProductsByCategory } from "@/lib/products";
import { CategoryCardSkeleton } from "@/components/skeletons";

export default function CategoriesContent() {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = categories.map(cat => ({
      ...cat,
      products: getProductsByCategory(cat.name)
    }));
    setCategoryData(data);
    setLoading(false);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      {/* ... rest of component (unchanged) ... */}
    </div>
  );
}