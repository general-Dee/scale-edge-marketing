"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '@/lib/gsap';
import { getRecentProducts } from '@/lib/services/product-service.client';
import { categories, getCategoryColor, getCategoryIcon } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!headlineRef.current) return;
    const split = new SplitText(headlineRef.current, { type: 'words,chars' });
    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }, { scope: headlineRef });

  useEffect(() => {
    setMounted(true);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getRecentProducts(8);
        setFeaturedProducts(products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Could not load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 ref={headlineRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Premium Gadgets & Solar for the{" "}
                <span className="text-orange-600 dark:text-orange-400">Modern Nigerian</span> Home
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Discover top brands: Apple, Samsung, Sony, Google, Sun King, and more – all at unbeatable prices.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mb-8">
                {[
                  { icon: "✓", bg: "bg-green-100 dark:bg-green-900/30", text: "10,000+", subtext: "Happy Customers" },
                  { icon: "⭐", bg: "bg-blue-100 dark:bg-blue-900/30", text: "4.8/5", subtext: "Customer Rating" },
                  { icon: "🚚", bg: "bg-purple-100 dark:bg-purple-900/30", text: "Free Delivery", subtext: "Lagos & Abuja" },
                  { icon: "🔒", bg: "bg-orange-100 dark:bg-orange-900/30", text: "Secure", subtext: "Paystack Payments" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-green-600 dark:text-green-400 text-xl">{item.icon}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{item.text}</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="#featured" className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors text-base sm:text-lg shadow-lg">
                Shop Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            {/* Category Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className={`${getCategoryColor(cat.name)} dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all block text-center`}
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2 block text-gray-900 dark:text-white">
                    {cat.icon}
                  </span>
                  <h3 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white line-clamp-2">{cat.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Featured Products</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">Hand-picked bestsellers from our premium collection</p>
          </div>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg">Retry</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/categories/all" className="inline-flex items-center px-5 sm:px-6 py-2 sm:py-3 border-2 border-orange-600 dark:border-orange-400 text-orange-600 dark:text-orange-400 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-400 dark:hover:text-gray-900 font-semibold rounded-lg transition-colors text-sm sm:text-base">
              View All Products
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}