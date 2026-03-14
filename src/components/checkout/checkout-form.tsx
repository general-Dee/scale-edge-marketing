'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/lib/actions/checkout-actions';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export function CheckoutForm() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append('cart', JSON.stringify(cart));
    formData.append('total', subtotal.toString());

    try {
      await createOrder(formData);
    } catch (err) {
      setError('Failed to create order. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                State
              </label>
              <input
                type="text"
                name="state"
                id="state"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Shipping Method</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="shipping_method"
              value="standard"
              defaultChecked
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Standard (₦1,500) - 3-5 business days</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="shipping_method"
              value="express"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Express (₦3,000) - 1-2 business days</span>
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {item.name} x {item.quantity}
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                ₦{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-gray-900 dark:text-white">Subtotal</span>
              <span className="text-gray-900 dark:text-white">₦{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 font-medium"
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </form>
  );
}