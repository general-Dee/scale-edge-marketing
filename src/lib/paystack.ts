export const generateReference = (prefix: string = "SEM"): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};

export const initializePayment = (config: any): void => {
  if (typeof window === "undefined" || !window.PaystackPop) {
    console.error("Paystack not loaded");
    return;
  }

  const handler = window.PaystackPop.setup({
    key: config.publicKey,
    email: config.email,
    amount: config.amount,
    ref: config.reference,
    metadata: config.metadata || {},
    currency: config.currency || "NGN",
    channels: config.channels || ["card", "bank", "ussd", "bank_transfer"],
    callback: config.callback,
    onClose: config.onClose,
  });

  handler.openIframe();
};

declare global {
  interface Window {
    PaystackPop: any;
  }
}