"use client";

import { Fragment, useEffect, useState, memo, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCart } from "./cart-provider";
import { useMetaPixel } from "@/components/providers/meta-pixel-provider";
import Link from "next/link";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawerComponent = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();
  const { trackEvent } = useMetaPixel();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuantityChange = useCallback((id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  }, [removeItem, updateQuantity]);

  const handleRemoveItem = useCallback((id: string) => {
    removeItem(id);
  }, [removeItem]);

  const handleCheckoutClick = useCallback(() => {
    trackEvent("InitiateCheckout", {
      content_name: "Cart Drawer Checkout",
      value: total,
      currency: "NGN",
      num_items: itemCount,
    });
    onClose();
  }, [trackEvent, total, itemCount, onClose]);

  const handleClearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  }, [clearCart]);

  const getCategoryIcon = useCallback((category?: string) => {
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
  }, []);

  if (!mounted) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* ... rest of component (unchanged) ... */}
      </Dialog>
    </Transition.Root>
  );
};

export const CartDrawer = memo(CartDrawerComponent);