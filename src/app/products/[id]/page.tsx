"use client";

export const dynamic = 'force-dynamic';

import { useState, useRef } from "react";
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
import { ErrorBoundary } from "@/components/error-boundary";
import useSWR from 'swr';

const fetcher = (id: string) => getProductById(id);

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const { data: product, error, isLoading } = useSWR(productId, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // cache for 1 minute
  });

  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();
  const { trackViewContent, trackAddToCart } = useMetaPixel();
  const cartButtonRef = useCartButtonRef();
  const productContainerRef = useRef<HTMLDivElement>(null);

  // Track view when product loads
  useState(() => {
    if (product) {
      trackViewContent(product.name, [product.id], product.price, "NGN");
    }
  });

  useGSAP(() => {
    if (!productContainerRef.current || !product) return;
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
      toast.success(`${product.name} added to cart!`, { icon: '🛒', duration: 3000 });
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
              <p className="text-red-600 dark:text-red-400 mb-4">Unable to load product. Please check your connection.</p>
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

  if (isLoading || !product) {
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
            {/* Breadcrumb and rest of the component remains same */}
            {/* ... (use your existing JSX) ... */}
          </div>
        </div>
      </ErrorBoundary>
    </PageTemplate>
  );
}