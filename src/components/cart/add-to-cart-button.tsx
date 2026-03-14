'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/cart-provider';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_urls?: string[];
    in_stock: boolean;
  };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!product.in_stock) {
      toast.error('Product is out of stock');
      return;
    }

    setIsAdding(true);
    // Simulate slight delay for better UX
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image_urls?.[0] || '',
      });
      toast.success('Added to cart!');
      setIsAdding(false);
      setQuantity(1);
    }, 300);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg self-start">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1 || !product.in_stock}
          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          -
        </button>
        <span className="px-4 py-2 text-gray-900 dark:text-white min-w-[3rem] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          disabled={!product.in_stock}
          className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!product.in_stock || isAdding}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
          product.in_stock
            ? 'bg-orange-600 hover:bg-orange-700 text-white'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : product.in_stock ? (
          'Add to Cart'
        ) : (
          'Out of Stock'
        )}
      </button>
    </div>
  );
}