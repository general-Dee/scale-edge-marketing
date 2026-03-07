"use client";

// Force dynamic rendering to avoid prerender issues
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { motion } from "framer-motion";
import { categories, getProductsByCategory } from "@/lib/products";
import { SuspenseWrapper } from "@/components/suspense-wrapper";
import { fadeUp, staggerContainer } from "@/components/animations";

export default function CategoriesPage() {
  return (
    <SuspenseWrapper>
      <CategoriesContent />
    </SuspenseWrapper>
  );
}

function CategoriesContent() {
  // Helper function to get gradient color for each category
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse our curated collection across 8 categories with over 30 premium products
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {categories.map((category) => {
            const products = getProductsByCategory(category.name);
            return (
              <motion.div
                key={category.name}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 block"
                >
                  <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(category.name)} flex items-center justify-center`}>
                    <motion.span 
                      className="text-7xl transform group-hover:scale-110 transition-transform"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {category.icon}
                    </motion.span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {products.length} products available
                    </p>
                    <div className="flex items-center text-orange-600 font-semibold">
                      Shop Now
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            variants={fadeUp}
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">32+</div>
            <div className="text-gray-600 dark:text-gray-400">Total Products</div>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            variants={fadeUp}
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            variants={fadeUp}
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">6+</div>
            <div className="text-gray-600 dark:text-gray-400">Top Brands</div>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center"
            variants={fadeUp}
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
            <div className="text-gray-600 dark:text-gray-400">Avg Rating</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}