'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/components/cart/cart-provider';
import { usePathname } from 'next/navigation';
import { CurrencySelector } from '@/components/currency-selector';
import { UserMenu } from '@/components/user-menu';
import { CartDrawer } from '@/components/cart/cart-drawer';

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const pathname = usePathname();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-bold text-orange-600">
            Scale-Edge
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors ${
                pathname === '/categories'
                  ? 'text-orange-600'
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-600'
              }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                pathname === '/about'
                  ? 'text-orange-600'
                  : 'text-gray-700 dark:text-gray-300 hover:text-orange-600'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <CurrencySelector />

            {/* Cart button – OPENS DRAWER */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <UserMenu />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/categories"
                className={`px-2 py-2 text-base font-medium rounded-md ${
                  pathname === '/categories'
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className={`px-2 py-2 text-base font-medium rounded-md ${
                  pathname === '/about'
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Cart Drawer – rendered here */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}