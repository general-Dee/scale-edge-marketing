"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { useMetaPixel } from "@/components/providers/meta-pixel-provider";
import { getProductById } from "@/lib/services/product-service";
import toast from "react-hot-toast";
import { PageTemplate } from "@/components/page-template";
import { ImageGallery } from "@/components/products/image-gallery";
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useCartButtonRef } from '@/contexts/CartButtonRefContext';
import { flyToCart } from '@/lib/flyToCart';
import { ErrorBoundary } from "@/components/error-boundary"; // ✅ named import

const fetchProductWithRetry = async (id: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await getProductById(id);
      if (data) return data;
    } catch (err) {
      console.log(`Attempt ${i + 1} failed`, err);
      if (i === retries - 1) throw err;
      await new Promise(res => setTimeout(res, 1000 * Math.pow(2, i)));
    }
  }
  return null;
};

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  const { addItem } = useCart();
  const { trackViewContent, trackAddToCart } = useMetaPixel();
  const cartButtonRef = useCartButtonRef();

  const productContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!productContainerRef.current) return;
    gsap.from('.gsap-product-item', {
      scrollTrigger: {
        trigger: productContainerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
    });
  }, { scope: productContainerRef, dependencies: [product] });

  useEffect(() => {
    setMounted(true);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductWithRetry(productId);
        setProduct(data);
        if (data) {
          trackViewContent(data.name, [data.id], data.price, "NGN");
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Unable to load product. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, trackViewContent]);

  const handleAddToCart = () => {
    if (!product) return;

    const button = document.activeElement as HTMLElement;

    const addItemToCart = () => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image_urls?.[0] || '',
        brand: product.brand,
        category: product.category,
      });

      trackAddToCart(product.id, product.price * quantity, "NGN", {
        content_name: product.name,
        quantity,
      });

      toast.success(`${product.name} added to cart!`, {
        icon: '🛒',
        duration: 3000,
      });
    };

    if (button && cartButtonRef.current) {
      flyToCart(button, cartButtonRef.current, addItemToCart);
    } else {
      addItemToCart();
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };

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
    return colors[categoryName] || "bg-orange-100";
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </PageTemplate>
    );
  }

  if (loading || !product) {
    return (
      <PageTemplate fallback={<div className="min-h-screen bg-gray-50 dark:bg-gray-900" />}>
        <div />
      </PageTemplate>
    );
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <PageTemplate fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {product.category && (
              <nav className="flex mb-8 text-sm">
                <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link href="/categories" className="text-gray-500 hover:text-orange-600">Categories</Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link
                  href={`/categories/${product.category.toLowerCase().replace(/ /g, '-')}`}
                  className="text-gray-500 hover:text-orange-600"
                >
                  {product.category}
                </Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
              </nav>
            )}

            <div ref={productContainerRef} className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
                  <div className="gsap-product-item">
                    <ImageGallery
                      images={product.image_urls || []}
                      productName={product.name}
                      category={product.category}
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="gsap-product-item">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-orange-600 bg-orange-100 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                          {product.brand}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{product.category}</span>
                      </div>
                    </div>

                    <div className="gsap-product-item flex items-center gap-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{product.review_count} verified reviews</span>
                    </div>

                    <div className="gsap-product-item border-t border-b border-gray-200 dark:border-gray-700 py-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">₦{product.price.toLocaleString()}</span>
                        {product.compare_at_price && (
                          <span className="text-lg text-gray-500 line-through">₦{product.compare_at_price.toLocaleString()}</span>
                        )}
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Free shipping in Lagos & Abuja
                      </p>
                    </div>

                    <div className="gsap-product-item flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${product.in_stock ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{product.in_stock ? "In Stock" : "Out of Stock"}</span>
                    </div>

                    <div className="gsap-product-item">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">-</button>
                        <span className="w-16 text-center font-medium text-lg text-gray-900 dark:text-white">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">+</button>
                      </div>
                    </div>

                    <div className="gsap-product-item space-y-3">
                      <button onClick={handleAddToCart} disabled={!product.in_stock} className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${product.in_stock ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl" : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"}`}>
                        {product.in_stock ? "🛒 Add to Cart" : "Out of Stock"}
                      </button>
                      <button onClick={handleBuyNow} disabled={!product.in_stock} className={`w-full py-3 px-6 rounded-lg font-semibold transition-all border-2 ${product.in_stock ? "border-orange-600 dark:border-orange-400 text-orange-600 dark:text-orange-400 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-400 dark:hover:text-gray-900" : "border-gray-300 text-gray-400 cursor-not-allowed"}`}>
                        Buy Now
                      </button>
                    </div>

                    {product.tags && product.tags.length > 0 && (
                      <div className="gsap-product-item flex flex-wrap gap-2">
                        {product.tags.slice(0, 5).map((tag: string) => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm hover:bg-orange-100 hover:text-orange-600 transition-colors cursor-default">#{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="gsap-product-item border-t border-gray-200 dark:border-gray-700 pt-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
                        <span className="text-green-600">✓</span> Secure payment powered by Paystack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {["💳 Cards", "🏦 Bank Transfer", "📱 USSD", "💰 Pay on Delivery"].map((method, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300">{method}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-6 lg:px-12 py-8">
                  <div className="gsap-product-item prose dark:prose-invert max-w-none">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Product Description</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{product.description}</p>

                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Key Features</h3>
                    <ul className="list-disc pl-5 mb-6 space-y-2">
                      {product.features?.map((feature: string, index: number) => (
                        <li key={index} className="text-gray-600 dark:text-gray-400">{feature}</li>
                      ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      {Object.entries(product.specifications || {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{key}:</span>
                          <span className="text-gray-600 dark:text-gray-400">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {product.category && (
                <div className="gsap-product-item text-center mt-12">
                  <Link href={`/categories/${product.category.toLowerCase().replace(/ /g, '-')}`} className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-semibold">
                    <span>Browse more {product.category}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </PageTemplate>
  );
}