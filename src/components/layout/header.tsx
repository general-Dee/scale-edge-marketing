"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CartDrawerIsolated } from "@/components/cart/cart-drawer-isolated";

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-orange-600">
              Scale-Edge
            </Link>
          </div>
          <div className="w-6 h-6"></div>
        </nav>
      </header>
    );
  }

  return (
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

        <CartDrawerIsolated />
      </nav>
    </header>
  );
}