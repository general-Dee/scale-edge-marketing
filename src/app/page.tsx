"use client";

// Force dynamic rendering to avoid prerender issues
export const dynamic = 'force-dynamic';

import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedProducts, categories } from "@/lib/products";
import { 
  PageWrapper,
  SectionWrapper, 
  CardWrapper, 
  staggerContainer,
  fadeUp,
  slideInLeft,
  slideInRight
} from "@/components/animations";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);

  // Helper function to get category color
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

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Animated background pattern */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-grid-pattern"
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="show"
            >
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                variants={fadeUp}
              >
                Premium Products for the{" "}
                <motion.span 
                  className="text-orange-600 dark:text-orange-400 inline-block"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  Modern Nigerian
                </motion.span>{" "}
                Home
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                variants={fadeUp}
              >
                Discover our curated collection of premium electronics, solar essentials, 
                natural skincare, and home solutions. Shop top brands like Apple, Samsung, Sony, and Google Pixel.
              </motion.p>

              {/* Trust Signals */}
              <motion.div 
                className="flex flex-wrap gap-6 mb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
              >
                {[
                  { icon: "✓", bg: "bg-green-100", text: "10,000+", subtext: "Happy Customers" },
                  { icon: "⭐", bg: "bg-blue-100", text: "4.8/5", subtext: "Customer Rating" },
                  { icon: "🚚", bg: "bg-purple-100", text: "Free Delivery", subtext: "Lagos & Abuja" },
                  { icon: "🔒", bg: "bg-orange-100", text: "Secure", subtext: "Paystack Payments" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2"
                    variants={fadeUp}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-green-600 text-xl">{item.icon}</span>
                    </motion.div>
                    <div>
                      <p className="font-semibold">{item.text}</p>
                      <p className="text-sm text-gray-500">{item.subtext}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#featured"
                  className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors text-lg shadow-lg"
                >
                  Shop Now
                  <motion.svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Category Showcase (8 categories) */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              variants={slideInRight}
              initial="hidden"
              animate="show"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={`/categories/${category.name.toLowerCase().replace(/ /g, '-')}`}
                    className={`${getCategoryColor(category.name)} dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all block text-center`}
                  >
                    <motion.span 
                      className="text-3xl sm:text-4xl mb-2 block"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                        transition: { 
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.1,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {category.icon}
                    </motion.span>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">{category.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{category.count} products</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <SectionWrapper>
        <section id="featured" className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Hand-picked bestsellers from our premium collection
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {featuredProducts.map((product, index) => (
                <CardWrapper key={product.id} index={index}>
                  <Link
                    href={`/products/${product.id}`}
                    className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-4 block"
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
                      <motion.span 
                        className="mt-2 inline-block px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Bestseller
                      </motion.span>
                    )}
                  </Link>
                </CardWrapper>
              ))}
            </motion.div>

            <motion.div 
              className="text-center mt-12"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/categories/all"
                className="inline-flex items-center px-6 py-3 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold rounded-lg transition-colors"
              >
                View All Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Brand Showcase Section */}
      <SectionWrapper>
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8"
              variants={fadeUp}
            >
              Top Brands Available
            </motion.h2>
            <motion.div 
              className="flex flex-wrap justify-center gap-8 items-center"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {["Apple", "Samsung", "Sony", "Google Pixel", "SolarTech", "Naija Naturals"].map((brand, index) => (
                <motion.div
                  key={brand}
                  variants={fadeUp}
                  whileHover={{ scale: 1.1 }}
                  className="text-xl font-semibold text-gray-700 dark:text-gray-300 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow"
                >
                  {brand}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </SectionWrapper>
    </PageWrapper>
  );
}