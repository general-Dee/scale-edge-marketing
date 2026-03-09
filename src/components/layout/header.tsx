"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCartButtonRef } from "@/contexts/CartButtonRefContext";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const cartButtonRef = useCartButtonRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same structure to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-600 dark:text-orange-400">
            Scale-Edge
          </Link>
          <div className="w-10 h-10" /> {/* placeholder for cart icon */}
        </nav>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-600 dark:text-orange-400">
            Scale-Edge
          </Link>
          <button
            ref={cartButtonRef}
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-700 dark:text-white"
            aria-label="Open cart"
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