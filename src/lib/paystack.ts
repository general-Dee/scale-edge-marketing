// src/lib/paystack.ts

export interface PaystackConfig {
  publicKey: string;
  email: string;
  amount: number;
  reference?: string;
  metadata?: Record<string, any>;
  currency?: "NGN" | "USD" | "GHS" | "ZAR";
  channels?: ("card" | "bank" | "ussd" | "bank_transfer")[];
  callback?: (response: any) => void;
  onClose?: () => void;
}

export const generateReference = (prefix: string = "SEM"): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};

export const initializePayment = (config: PaystackConfig): void => {
  if (typeof window === "undefined" || !window.PaystackPop) {
    console.error("Paystack not loaded");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: config.publicKey,
    email: config.email,
    amount: config.amount,
    ref: config.reference || generateReference(),
    metadata: config.metadata || {},
    currency: config.currency || "NGN",
    channels: config.channels || ["card", "bank", "ussd", "bank_transfer"],
    callback: (response: any) => {
      if (config.callback) {
        config.callback(response);
      }
    },
    onClose: () => {
      if (config.onClose) {
        config.onClose();
      }
    },
  });

  handler.openIframe();
};

export const toKobo = (amount: number): number => {
  return Math.round(amount * 100);
};

export const fromKobo = (kobo: number): number => {
  return kobo / 100;
};

export const verifyTransaction = async (reference: string) => {
  try {
    const response = await fetch(`/api/paystack/verify?reference=${reference}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Verification error:", error);
    throw error;
  }
};

declare global {
  interface Window {
    PaystackPop: any;
  }
}