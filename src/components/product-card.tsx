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
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        {product.image_urls?.[0] ? (
          <Image
            src={product.image_urls[0]}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl text-gray-400">{getCategoryIcon(product.category)}</span>
          </div>
        )}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold mb-1">{product.brand}</p>
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.review_count})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
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
}