"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-orange-600">
              Scale-Edge
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-600">
                Home
              </Link>
              <Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-orange-600">
                Categories
              </Link>
              <Link href="/categories/all" className="text-gray-700 dark:text-gray-300 hover:text-orange-600">
                All Products
              </Link>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </nav>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}