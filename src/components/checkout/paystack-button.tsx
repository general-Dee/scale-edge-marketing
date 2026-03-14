'use client';

import { useEffect, useRef } from 'react';
import { generateReference, initializePayment } from '@/lib/paystack';

interface PaystackButtonProps {
  email: string;
  amount: number;
  metadata?: Record<string, any>;
  onSuccess: (reference: string) => void;
  onClose?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function PaystackButton({
  email,
  amount,
  metadata = {},
  onSuccess,
  onClose,
  disabled = false,
  className = '',
  children,
}: PaystackButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!email || amount <= 0) return;

    initializePayment({
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email,
      amount: amount * 100, // convert to kobo
      reference: generateReference('SEM'),
      metadata,
      currency: 'NGN',
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
      callback: (response: any) => {
        onSuccess(response.reference);
      },
      onClose: () => {
        if (onClose) onClose();
      },
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}