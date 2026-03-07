"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart/cart-provider";
import { useMetaPixel } from "@/components/providers/meta-pixel-provider";
import { products } from "@/lib/products";
import toast from "react-hot-toast";
import { 
  PageWrapper, 
  SectionWrapper, 
  fadeUp, 
  slideInLeft, 
  slideInRight,
  staggerContainer  // Add this import
} from "@/components/animations";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products[productId];

  const { addItem } = useCart();
  const { trackViewContent, trackAddToCart } = useMetaPixel();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Go Home
              </Link>
            </motion.div>
          </div>
        </div>
      </PageWrapper>
    );
  }

  // Track product view
  useState(() => {
    trackViewContent(product.name, [product.id], product.price, "NGN");
  });

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });

    trackAddToCart(product.id, product.price * quantity, "NGN", {
      content_name: product.name,
      quantity: quantity,
    });

    toast.success(`${product.name} added to cart!`);
    
    // Animate the cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      cartIcon.classList.add('animate-bounce');
      setTimeout(() => cartIcon.classList.remove('animate-bounce'), 500);
    }
  };

  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb with animation */}
          <motion.nav 
            className="flex mb-8 text-sm"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href={`/categories/${product.category.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-orange-600">
              {product.category}
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <motion.span 
              className="text-gray-900 dark:text-white"
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 0.5 }}
            >
              {product.name}
            </motion.span>
          </motion.nav>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
              {/* Product Image with gallery */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate="show"
              >
                <motion.div 
                  className="relative aspect-square mb-4 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-8xl"
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {product.category === "Solar Essentials" ? "☀️" : 
                       product.category === "Skincare" ? "🧴" : 
                       product.category === "Home Solutions" ? "🏠" : "🌸"}
                    </motion.span>
                  </div>
                  
                  {/* Badges with entrance animation */}
                  {discount > 0 && (
                    <motion.div 
                      className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded"
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      -{discount}% OFF
                    </motion.div>
                  )}
                  {product.tags.includes("bestseller") && (
                    <motion.div 
                      className="absolute top-4 right-4 bg-orange-600 text-white text-sm font-bold px-3 py-1 rounded"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      BESTSELLER
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Product Details */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="show"
              >
                <motion.h1 
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  variants={fadeUp}
                >
                  {product.name}
                </motion.h1>

                <motion.p 
                  className="text-sm text-gray-500 dark:text-gray-400 mb-4"
                  variants={fadeUp}
                >
                  {product.category}
                </motion.p>

                {/* Rating with star animation */}
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  variants={fadeUp}
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {product.reviews} reviews
                    </span>
                  </div>
                </motion.div>

                {/* Price with counting animation */}
                <motion.div 
                  className="mb-6"
                  variants={fadeUp}
                >
                  <div className="flex items-baseline gap-3">
                    <motion.span 
                      className="text-3xl font-bold text-orange-600"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ₦{product.price.toLocaleString()}
                    </motion.span>
                    {product.compareAtPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₦{product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <motion.p 
                    className="text-sm text-gray-500 mt-1"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Free shipping in Lagos & Abuja
                  </motion.p>
                </motion.div>

                {/* Stock Status */}
                <motion.div 
                  className="flex items-center gap-2 mb-6"
                  variants={fadeUp}
                >
                  <motion.div 
                    className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-sm">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </motion.div>

                {/* Quantity Selector */}
                <motion.div 
                  className="mb-6"
                  variants={fadeUp}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <motion.span 
                      className="w-16 text-center font-medium"
                      key={quantity}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.2 }}
                    >
                      {quantity}
                    </motion.span>
                    <motion.button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </motion.div>

                {/* Add to Cart Button */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg mb-6 ${
                    product.inStock
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                  variants={fadeUp}
                  whileHover={product.inStock ? { scale: 1.02 } : {}}
                  whileTap={product.inStock ? { scale: 0.98 } : {}}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </motion.button>

                {/* Tags */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  variants={fadeUp}
                >
                  {product.tags.map((tag, index) => (
                    <motion.span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Payment Methods */}
                <motion.div 
                  className="border-t border-gray-200 dark:border-gray-700 pt-6"
                  variants={fadeUp}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Secure payment powered by Paystack
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["💳 Cards", "🏦 Bank Transfer", "📱 USSD"].map((method, index) => (
                      <motion.span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        whileHover={{ scale: 1.1, backgroundColor: "#F97316", color: "white" }}
                        transition={{ duration: 0.2 }}
                      >
                        {method}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Product Details Tabs */}
            <SectionWrapper>
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 lg:px-12 py-8">
                <motion.div 
                  className="prose dark:prose-invert max-w-none"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <motion.h2 
                    className="text-xl font-semibold mb-4"
                    variants={fadeUp}
                  >
                    Product Description
                  </motion.h2>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-400 mb-6"
                    variants={fadeUp}
                  >
                    {product.description}
                  </motion.p>

                  <motion.h3 
                    className="text-lg font-semibold mb-3"
                    variants={fadeUp}
                  >
                    Key Features
                  </motion.h3>
                  <motion.ul 
                    className="list-disc pl-5 mb-6 space-y-1"
                    variants={fadeUp}
                  >
                    {product.features.map((feature, index) => (
                      <motion.li 
                        key={index} 
                        className="text-gray-600 dark:text-gray-400"
                        variants={fadeUp}
                        custom={index}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.h3 
                    className="text-lg font-semibold mb-3"
                    variants={fadeUp}
                  >
                    Specifications
                  </motion.h3>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={fadeUp}
                  >
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <motion.div 
                        key={key} 
                        className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700"
                        whileHover={{ scale: 1.02, backgroundColor: "#F9FAFB" }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}