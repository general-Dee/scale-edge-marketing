"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCart } from "./cart-provider";
import { useMetaPixel } from "@/components/providers/meta-pixel-provider";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const { trackEvent } = useMetaPixel();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleCheckoutClick = () => {
    trackEvent("InitiateCheckout", {
      content_name: "Cart Drawer Checkout",
      value: total,
      currency: "NGN",
      num_items: itemCount,
    });
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                          Shopping Cart ({itemCount})
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={onClose}
                          >
                            <XMarkIcon className="h-6 w-6" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {items.length === 0 ? (
                            <div className="text-center py-12">
                              <p className="text-gray-500 dark:text-gray-400">
                                Your cart is empty
                              </p>
                              <Link
                                href="/"
                                className="mt-4 inline-flex items-center text-orange-600 hover:text-orange-700"
                                onClick={onClose}
                              >
                                Continue Shopping
                              </Link>
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
                              {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <span className="text-3xl">📦</span>
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                        <h3>
                                          <Link href={`/products/${item.id}`} onClick={onClose}>
                                            {item.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          ₦{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                          className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                          -
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                          className="w-6 h-6 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                          +
                                        </button>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() => handleRemoveItem(item.id)}
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
                          Free shipping in Lagos & Abuja
                        </p>
                        <div className="mt-6">
                          <Link
                            href="/checkout"
                            onClick={handleCheckoutClick}
                            className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700"
                          >
                            Checkout
                          </Link>
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
  );
}