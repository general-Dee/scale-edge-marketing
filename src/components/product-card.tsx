'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getCategoryIcon } from '@/lib/products';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    compare_at_price?: number;
    image_urls: string[];
    category: string;
    brand: string;
    rating: number;
    review_count: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden block"
    >
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        {product.image_urls?.[0] ? (
          <Image
            src={product.image_urls[0]}
            alt={product.name}
            fill
            className="object-contain transform group-hover:scale-110 transition-transform"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <span className="text-4xl sm:text-5xl lg:text-6xl">{getCategoryIcon(product.category)}</span>
        )}
        {discount > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm sm:text-base">{product.name}</h3>
        <div className="flex items-center gap-1 sm:gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">({product.review_count})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400">
            ₦{product.price.toLocaleString()}
          </span>
          {product.compare_at_price && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₦{product.compare_at_price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}