"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFeaturedProducts, categories } from "@/lib/products";
import { ProductGridSkeleton } from "@/components/skeletons";

export default function HomeContent() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFeaturedProducts(getFeaturedProducts(8));
    setLoading(false);
  }, []);

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      "Phones": "bg-blue-100",
      "Tablets": "bg-purple-100",
      "Speakers": "bg-indigo-100",
      "Earpieces": "bg-pink-100",
      "Smart Watches": "bg-cyan-100",
      "Solar Essentials": "bg-orange-100",
      "Skincare": "bg-green-100",
      "Home Solutions": "bg-gray-100"
    };
    return colors[categoryName] || "bg-gray-100";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Scale-Edge...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                Discover our curated collection of premium electronics, solar essentials, 
                natural skincare, and home solutions. Shop top brands like Apple, Samsung, Sony, and Google Pixel.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { icon: "✓", bg: "bg-green-100", text: "10,000+", subtext: "Happy Customers" },
                  { icon: "⭐", bg: "bg-blue-100", text: "4.8/5", subtext: "Customer Rating" },
                  { icon: "🚚", bg: "bg-purple-100", text: "Free Delivery", subtext: "Lagos & Abuja" },
                  { icon: "🔒", bg: "bg-orange-100", text: "Secure", subtext: "Paystack Payments" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center`}>
                      <span className="text-green-600 text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{item.text}</p>
                      <p className="text-sm text-gray-500">{item.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href="#featured"
                className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg"
              >
                Shop Now
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Category Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                  className={`${getCategoryColor(category.name)} dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all block text-center`}
                >
                  <span className="text-3xl sm:text-4xl mb-2 block">
                    {category.icon}
                  </span>
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{category.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{category.count} products</p>
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
              Hand-picked bestsellers from our premium collection
            </p>
          </div>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-xl transition-all"
                >
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-5xl">
                      {product.category === "Phones" ? "📱" : 
                       product.category === "Tablets" ? "📟" :
                       product.category === "Speakers" ? "🔊" :
                       product.category === "Earpieces" ? "🎧" :
                       product.category === "Smart Watches" ? "⌚" :
                       product.category === "Solar Essentials" ? "☀️" : 
                       product.category === "Skincare" ? "🧴" : 
                       "🏠"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
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
          )}

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

      {/* Brand Showcase */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Top Brands Available
          </h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {["Apple", "Samsung", "Sony", "Google Pixel", "SolarTech", "Naija Naturals"].map((brand, index) => (
              <div
                key={brand}
                className="text-xl font-semibold text-gray-700 dark:text-gray-300 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}