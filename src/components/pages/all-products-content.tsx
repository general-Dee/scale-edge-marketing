"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products, categories } from "@/lib/products";
import { ProductGridSkeleton } from "@/components/skeletons";

export default function AllProductsContent() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAllProducts(Object.values(products));
    setLoading(false);
  }, []);

  const getCategoryIcon = (categoryName: string) => {
    const icons: Record<string, string> = {
      "Phones": "📱",
      "Tablets": "📟",
      "Speakers": "🔊",
      "Earpieces": "🎧",
      "Smart Watches": "⌚",
      "Solar Essentials": "☀️",
      "Skincare": "🧴",
      "Home Solutions": "🏠"
    };
    return icons[categoryName] || "📦";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
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