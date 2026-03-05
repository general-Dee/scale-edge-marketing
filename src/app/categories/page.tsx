import Link from "next/link";
import { categories, getProductsByCategory } from "@/lib/products";
import { SuspenseWrapper } from "@/components/suspense-wrapper";

export const dynamic = 'force-dynamic';

export default function CategoriesPage() {
  return (
    <SuspenseWrapper>
      <CategoriesContent />
    </SuspenseWrapper>
  );
}

function CategoriesContent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Browse our curated collection of products for the modern Nigerian home
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const products = getProductsByCategory(category.name);
            return (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-7xl transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </span>
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
            );
          })}
        </div>

        {/* Featured Categories Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
            <div className="text-gray-600 dark:text-gray-400">Products</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
            <div className="text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">10k+</div>
            <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
            <div className="text-gray-600 dark:text-gray-400">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}