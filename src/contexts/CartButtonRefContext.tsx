// src/contexts/CartButtonRefContext.tsx
"use client";

import { createContext, useContext, useRef, ReactNode } from 'react';

type CartButtonRefContextType = {
  cartButtonRef: React.RefObject<HTMLButtonElement>;
};

const CartButtonRefContext = createContext<CartButtonRefContextType | null>(null);

export const CartButtonRefProvider = ({ children }: { children: ReactNode }) => {
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <CartButtonRefContext.Provider value={{ cartButtonRef }}>
      {children}
    </CartButtonRefContext.Provider>
  );
};

export const useCartButtonRef = () => {
  const ctx = useContext(CartButtonRefContext);
  if (!ctx) {
    throw new Error('useCartButtonRef must be used within CartButtonRefProvider');
  }
  return ctx.cartButtonRef;
};