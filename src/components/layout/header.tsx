"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useCartButtonRef } from "@/contexts/CartButtonRefContext";
import { createClient } from '@/lib/supabase/client';

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const cartButtonRef = useCartButtonRef();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // Return a placeholder with the same structure to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-600 dark:text-orange-400">
            Scale-Edge
          </Link>
          <div className="w-10 h-10" />
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
          <div className="flex items-center gap-4">
            {/* User menu */}
            {user ? (
              <Link
                href="/account"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-700 dark:text-white"
                aria-label="Account"
              >
                <UserIcon className="w-6 h-6" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400"
              >
                Sign In
              </Link>
            )}
            <form action="/search" method="get" className="flex-1 max-w-lg mx-4">
                <input
                  type="text"
                  name="q"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                />
            </form>
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
          </div>
        </nav>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}