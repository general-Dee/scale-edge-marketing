"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { PaystackButton } from "@/components/checkout/paystack-button";
import Link from "next/link";
import toast from "react-hot-toast";

const SHIPPING_COSTS: Record<string, number> = {
  Lagos: 3000,
  Abuja: 3000,
  Ogun: 3500,
  Oyo: 4000,
  Rivers: 5000,
  Kano: 7000,
  Kaduna: 6500,
};
const DEFAULT_SHIPPING = 4000;

export default function CheckoutContent() {
  const { items, total } = useCart();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos"
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    document.getElementById("payment-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const shippingCost = SHIPPING_COSTS[formData.state] ?? DEFAULT_SHIPPING;
  const finalTotal = total + shippingCost;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Add some products to your cart before checking out.</p>
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      {/* ... rest of your checkout form (unchanged) ... */}
    </div>
  );
}