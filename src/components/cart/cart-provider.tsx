"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useMetaPixel } from "@/components/providers/meta-pixel-provider";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand?: string;
  category?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'scale-edge-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const { trackEvent, trackAddToCart } = useMetaPixel();

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (newItem: CartItem) => {
    setItems(currentItems => {
      // Check if item already exists in cart
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Item exists - update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        
        // Track add to cart event (only if tracking is available)
        try {
          trackAddToCart(newItem.id, newItem.price * newItem.quantity, "NGN", {
            content_name: newItem.name,
            action: "increase_quantity",
            cart_total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          });
        } catch (error) {
          console.log('Tracking unavailable');
        }
        
        return updatedItems;
      } else {
        // New item - add to cart
        try {
          trackAddToCart(newItem.id, newItem.price * newItem.quantity, "NGN", {
            content_name: newItem.name,
            action: "first_add",
            cart_total: [...currentItems, newItem].reduce((sum, item) => sum + (item.price * item.quantity), 0)
          });
        } catch (error) {
          console.log('Tracking unavailable');
        }
        
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      const updatedItems = currentItems.filter(item => item.id !== id);
      
      if (itemToRemove) {
        try {
          trackEvent("CustomizeProduct", {
            content_name: "Remove from Cart",
            content_ids: [id],
            product_name: itemToRemove.name,
            cart_total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          });
        } catch (error) {
          console.log('Tracking unavailable');
        }
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems => {
      const updatedItems = currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      // Track quantity update
      const item = currentItems.find(i => i.id === id);
      if (item) {
        try {
          trackEvent("CustomizeProduct", {
            content_name: "Update Quantity",
            content_ids: [id],
            quantity: quantity,
            value: item.price * quantity,
            currency: "NGN"
          });
        } catch (error) {
          console.log('Tracking unavailable');
        }
      }
      
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    
    try {
      trackEvent("CustomizeProduct", {
        content_name: "Cart Cleared"
      });
    } catch (error) {
      console.log('Tracking unavailable');
    }
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    // Add shipping, tax, etc. if needed
    return getSubtotal();
  };

  const itemCount = getItemCount();
  const total = getTotal();

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
        getTotal,
        itemCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}