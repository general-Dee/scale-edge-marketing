import Link from "next/link";
import { getFeaturedProducts, categories } from "@/lib/products";
import { SuspenseWrapper } from "@/components/suspense-wrapper";

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <SuspenseWrapper>
      <HomeContent />
    </SuspenseWrapper>
  );
}

function HomeContent() {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Premium Products for the{" "}
                <span className="text-orange-600 dark:text-orange-400">
                  Modern Nigerian
                </span>{" "}
                Home
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Discover our curated collection of solar essentials, natural skincare,
                home solutions, and luxury fragrances. Join 10,000+ happy customers.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold">10,000+</p>
                    <p className="text-sm text-gray-500">Happy Customers</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="font-semibold">4.8/5</p>
                    <p className="text-sm text-gray-500">Customer Rating</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xl">🚚</span>
                  </div>
                  <div>
                    <p className="font-semibold">Free Delivery</p>
                    <p className="text-sm text-gray-500">Lagos & Abuja</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="#featured"
                className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors text-lg"
              >
                Shop Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right Content - Category Showcase */}
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
                  className={`${
                    index === 0 ? "bg-orange-100" :
                    index === 1 ? "bg-green-100" :
                    index === 2 ? "bg-blue-100" : "bg-purple-100"
                  } dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center`}
                >
                  <span className="text-4xl mb-2 block">{category.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} products</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hand-picked essentials for the modern Nigerian home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-xl transition-all"
              >
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-5xl">
                    {product.category === "Solar Essentials" ? "☀️" : 
                     product.category === "Skincare" ? "🧴" : 
                     product.category === "Home Solutions" ? "🏠" : "🌸"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</p>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-orange-600 font-bold">₦{product.price.toLocaleString()}</p>
                  {product.compareAtPrice && (
                    <p className="text-xs text-gray-400 line-through">₦{product.compareAtPrice.toLocaleString()}</p>
                  )}
                </div>
                {product.tags.includes("bestseller") && (
                  <span className="mt-2 inline-block px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                    Bestseller
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/categories/all"
              className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold rounded-lg transition-colors"
            >
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}