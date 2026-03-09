"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory, Product } from "@/lib/services/product-service";
import { categories } from "@/lib/products";
import { PageTemplate } from "@/components/page-template";
import { ProductGridSkeleton } from "@/components/skeletons";
import { ErrorBoundary } from "@/components/error-boundary";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    // Convert slug back to category name
    const name = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setCategoryName(name);

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsByCategory(name);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  const getCategoryIcon = (name: string) => {
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
    return icons[name] || "📦";
  };

  const getCategoryColor = (name: string) => {
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
    return colors[name] || "bg-orange-100";
  };

  if (loading) {
    return (
      <PageTemplate fallback={<ProductGridSkeleton count={8} />}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-8 animate-pulse"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              </div>
            </div>
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12">
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex mb-8 text-sm">
              <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link href="/categories" className="text-gray-500 hover:text-orange-600">Categories</Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900 dark:text-white">{categoryName}</span>
            </nav>

            {/* Category Header */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-orange-600`}>
              <div className="flex items-center gap-4">
                <div className={`w-20 h-20 ${getCategoryColor(categoryName)} rounded-full flex items-center justify-center text-4xl`}>
                  {getCategoryIcon(categoryName)}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {categoryName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {products.length} products available from top brands
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                <p className="text-gray-600 dark:text-gray-400">
                  No products found in this category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => {
                  const discount = product.compare_at_price
                    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                    : 0;

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden block"
                    >
                      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-8 overflow-hidden">
                        {product.image_urls?.[0] ? (
                          <Image
                            src={product.image_urls[0]}
                            alt={product.name}
                            fill
                            className="object-contain transform group-hover:scale-110 transition-transform"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        ) : (
                          <span className="text-6xl">{getCategoryIcon(categoryName)}</span>
                        )}
                        {discount > 0 && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            -{discount}%
                          </div>
                        )}
                        {product.tags?.includes("bestseller") && (
                          <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                            BESTSELLER
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
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
                            ({product.review_count})
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {product.compare_at_price && (
                            <span className="text-sm text-gray-400 line-through">
                              ₦{product.compare_at_price.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </PageTemplate>
  );
}