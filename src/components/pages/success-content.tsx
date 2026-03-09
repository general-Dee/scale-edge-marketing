"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Payment Successful! 🎉</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you for your order! We've received your payment and are processing it.</p>
          {reference && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Transaction Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{reference}</span>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">We've sent a confirmation email with your order details.</p>
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}