'use client';

import { useState } from 'react';
import { useCart } from '@/components/cart/cart-provider';
import PaystackButton from '@/components/checkout/paystack-button';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { EmptyCart } from '@/components/cart/empty-cart';

// Stepper component
function CheckoutStepper({ currentStep }: { currentStep: number }) {
  const steps = ['Cart', 'Checkout', 'Payment'];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`ml-2 text-sm ${
              index <= currentStep
                ? 'text-orange-600 font-semibold'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 mx-2 bg-gray-300 dark:bg-gray-600" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CheckoutContent() {
  const { items, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Shipping rates: ₦6,000 standard, ₦10,000 express
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'express' ? 10000 : 6000;
  const total = subtotal + shippingFee;

  const handlePaystackSuccess = (reference: string) => {
    toast.success('Payment successful!');
    clearCart();
    window.location.href = `/checkout/success?reference=${reference}`;
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
        Checkout
      </h1>

      <CheckoutStepper currentStep={1} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Shipping Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="radio"
                  name="shipping"
                  value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Standard Delivery</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₦6,000 · 3-5 business days</p>
                </div>
              </label>
              <label className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <input
                  type="radio"
                  name="shipping"
                  value="express"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Express Delivery</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">₦10,000 · 1-2 business days</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 sticky top-24">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 truncate pr-2">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium whitespace-nowrap">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  ₦{shippingFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-orange-600 text-lg sm:text-xl">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            <PaystackButton
              email={email}
              amount={total}
              metadata={{
                customer_name: `${firstName} ${lastName}`,
                customer_phone: phone,
                shipping_address: `${address}, ${city}, ${state}`,
                shipping_method: shippingMethod,
                cart_items: items,
              }}
              onSuccess={handlePaystackSuccess}
              disabled={!email || !firstName || !lastName || !phone || !address || !city || !state}
              className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white py-3 sm:py-4 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ₦{total.toLocaleString()}
            </PaystackButton>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              You will be redirected to Paystack to complete your payment securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}