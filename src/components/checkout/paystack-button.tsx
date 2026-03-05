"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { useMetaPixel } from "@/components/providers/meta-pixel-provider";
import { initializePayment, toKobo } from "@/lib/paystack";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PaystackButtonProps {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  metadata?: Record<string, any>;
  className?: string;
  children?: React.ReactNode;
}

interface PaystackResponse {
  reference: string;
  transaction: string;
  status: string;
  message: string;
}

export function PaystackButton({
  email,
  firstName,
  lastName,
  phone,
  metadata = {},
  className = "",
  children,
}: PaystackButtonProps) {
  const [loading, setLoading] = useState(false);
  const { items, total, clearCart } = useCart();
  const { trackPurchase, trackEvent } = useMetaPixel();
  const router = useRouter();

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const handlePayment = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    setLoading(true);

    try {
      trackEvent("InitiateCheckout", {
        content_name: "Paystack Payment Started",
        value: total,
        currency: "NGN",
        num_items: items.length,
      });

      const orderMetadata = {
        ...metadata,
        customer_name: `${firstName} ${lastName}`.trim(),
        phone,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total_amount: total,
      };

      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: total,
          currency: "NGN",
          metadata: orderMetadata,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Payment initialization failed");
      }

      trackEvent("AddPaymentInfo", {
        content_name: "Paystack Initialized",
        reference: result.data.reference,
      });

      initializePayment({
        publicKey,
        email,
        amount: toKobo(total),
        reference: result.data.reference,
        metadata: orderMetadata,
        currency: "NGN",
        channels: ["card", "bank", "ussd", "bank_transfer"],
        callback: (response: PaystackResponse) => {
          toast.success("Payment successful! Processing your order...");
          
          trackPurchase(total, "NGN", items.map((item) => item.id), {
            reference: response.reference,
            transaction_id: response.transaction,
          });

          clearCart();
          router.push(`/checkout/success?reference=${response.reference}`);
        },
        onClose: () => {
          toast.error("Payment cancelled");
          trackEvent("InitiateCheckout", {
            content_name: "Paystack Modal Closed",
            status: "cancelled",
          });
          setLoading(false);
        },
      });

    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
      trackEvent("Contact", {
        content_name: "Paystack Error",
        status: "failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || items.length === 0}
      className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </>
      ) : (
        children || "Pay with Paystack"
      )}
    </button>
  );
}