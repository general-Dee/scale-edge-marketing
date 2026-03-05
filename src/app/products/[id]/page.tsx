"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { useMetaPixel } from "@/components/providers/meta-pixel-provider";
import { products, Product } from "@/lib/products";
import toast from "react-hot-toast";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products[productId];

  const { addItem } = useCart();
  const { trackViewContent, trackAddToCart } = useMetaPixel();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
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
  };

  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href={`/categories/${product.category.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-orange-600">
            {product.category}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
            {/* Product Image */}
            <div>
              <div className="relative aspect-square mb-4 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
                <span className="text-8xl">
                  {product.category === "Solar Essentials" ? "☀️" : 
                   product.category === "Skincare" ? "🧴" : 
                   product.category === "Home Solutions" ? "🏠" : "🌸"}
                </span>
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                    -{discount}% OFF
                  </div>
                )}
                {product.tags.includes("bestseller") && (
                  <div className="absolute top-4 right-4 bg-orange-600 text-white text-sm font-bold px-3 py-1 rounded">
                    BESTSELLER
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {product.category}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
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
                  <span className="ml-2 text-sm text-gray-500">
                    {product.reviews} reviews
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-orange-600">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₦{product.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Free shipping in Lagos & Abuja
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg mb-6 ${
                  product.inStock
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Secure payment powered by Paystack
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">💳 Cards</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">🏦 Bank Transfer</span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">📱 USSD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 lg:px-12 py-8">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-4">Product Description</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {product.description}
              </p>

              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {feature}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-600 dark:text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Coming soon */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* We'll add related products later */}
          </div>
        </div>
      </div>
    </div>
  );
}