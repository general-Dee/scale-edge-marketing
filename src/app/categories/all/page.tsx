"use client";

// Force dynamic rendering to avoid prerender issues
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { motion } from "framer-motion";
import { products, categories } from "@/lib/products";
import { SuspenseWrapper } from "@/components/suspense-wrapper";
import { fadeUp, staggerContainer, CardWrapper } from "@/components/animations";

export default function AllProductsPage() {
  return (
    <SuspenseWrapper>
      <AllProductsContent />
    </SuspenseWrapper>
  );
}

function AllProductsContent() {
  const allProducts = Object.values(products);

  // Helper function to get category icon
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav 
          className="flex mb-8 text-sm"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/categories" className="text-gray-500 hover:text-orange-600">Categories</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">All Products</span>
        </motion.nav>

        {/* Header */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our complete collection of {allProducts.length} premium products
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          className="mb-8 flex flex-wrap gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Link
            href="/categories/all"
            className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-semibold"
          >
            All Products
          </Link>
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {category.icon} {category.name}
            </Link>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {allProducts.map((product, index) => {
            const category = categories.find(c => c.name === product.category);
            const discount = product.compareAtPrice 
              ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
              : 0;

            return (
              <CardWrapper key={product.id} index={index}>
                <Link
                  href={`/products/${product.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden block"
                >
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-8">
                    <span className="text-6xl transform group-hover:scale-110 transition-transform">
                      {getCategoryIcon(product.category)}
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
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {product.brand}
                    </p>
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
                  </div>
                </Link>
              </CardWrapper>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}