"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// This component has no props - it manages its own state
export function CartDrawerIsolated() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    setMounted(true);
    loadCart();
    
    // Listen for cart updates
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('scale-edge-cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setItems(cartItems);
        
        const count = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setItemCount(count);
        
        const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        setTotal(subtotal);
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setItems(updatedItems);
    localStorage.setItem('scale-edge-cart', JSON.stringify(updatedItems));
    
    // Update counts
    const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(count);
    
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(subtotal);
    
    // Trigger event for other components
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('scale-edge-cart', JSON.stringify(updatedItems));
    
    // Update counts
    const count = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(count);
    
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(subtotal);
    
    // Trigger event for other components
    window.dispatchEvent(new Event('cart-updated'));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setItems([]);
      setItemCount(0);
      setTotal(0);
      localStorage.removeItem('scale-edge-cart');
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  const getCategoryIcon = (category?: string) => {
    const icons: Record<string, string> = {
      "Phones": "📱",
      "Tablets": "📟",
      "Speakers": "🔊",
      "Earpieces": "🎧",
      "Smart Watches": "⌚",
      "Solar Essentials": "☀️",
      "Skincare": "🧴",
      "Home Solutions": "🏠"
    };
    return icons[category || ""] || "📦";
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Cart button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Open cart"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart drawer */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                            Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <XMarkIcon className="h-6 w-6" />
                            </button>
                          </div>
                        </div>

                        {items.length > 0 && (
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={clearCart}
                              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              Clear Cart
                            </button>
                          </div>
                        )}

                        <div className="mt-8">
                          <div className="flow-root">
                            {items.length === 0 ? (
                              <div className="text-center py-12">
                                <div className="text-6xl mb-4">🛒</div>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                  Your cart is empty
                                </p>
                                <Link
                                  href="/"
                                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Continue Shopping
                                </Link>
                              </div>
                            ) : (
                              <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                                {items.map((item) => (
                                  <li key={item.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                                      {item.image ? (
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                          <span className="text-3xl">{getCategoryIcon(item.category)}</span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                          <h3>
                                            <Link href={`/products/${item.id}`} onClick={() => setIsOpen(false)}>
                                              {item.name}
                                            </Link>
                                          </h3>
                                          <p className="ml-4">
                                            ₦{(item.price * item.quantity).toLocaleString()}
                                          </p>
                                        </div>
                                        {item.brand && (
                                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                            {item.brand}
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                                          >
                                            -
                                          </button>
                                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                                          <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                                          >
                                            +
                                          </button>
                                        </div>

                                        <button
                                          type="button"
                                          onClick={() => removeItem(item.id)}
                                          className="font-medium text-orange-600 hover:text-orange-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>

                      {items.length > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                            <p>Subtotal</p>
                            <p>₦{total.toLocaleString()}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                            Shipping calculated at checkout
                          </p>
                          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                            ✦ Free shipping in Lagos & Abuja
                          </p>
                          <div className="mt-6">
                            <Link
                              href="/checkout"
                              onClick={() => setIsOpen(false)}
                              className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                            >
                              Checkout ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                            </Link>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500 dark:text-gray-400">
                            <p>
                              or{" "}
                              <button
                                type="button"
                                className="font-medium text-orange-600 hover:text-orange-500"
                                onClick={() => setIsOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}