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
      const existingItemIndex = currentItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Item exists - update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        
        // Track add to cart event
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
      const updatedItems = currentItems.filter(item => item.id !== id);
      return updatedItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Computed values
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
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