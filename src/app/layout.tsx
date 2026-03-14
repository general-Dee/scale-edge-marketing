import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MetaPixelProvider } from '@/components/providers/meta-pixel-provider';
import { CartProvider } from '@/components/cart/cart-provider'; // ✅ import
import { Header } from '@/components/layout/header';
import { Toaster } from 'react-hot-toast';
import { AnimationProvider } from '@/components/providers/animation-provider';
import { CartButtonRefProvider } from '@/contexts/CartButtonRefContext';
import { Suspense } from 'react';
import WhatsAppButton from '@/components/whatsapp-button';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Scale-Edge Marketing',
    template: '%s | Scale-Edge Marketing',
  },
  description: 'Premium gadgets and solar solutions for the modern Nigerian consumer.',
  // ... other metadata
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.paystack.co/v1/inline.js" async />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <CartButtonRefProvider>
            <MetaPixelProvider>
              <CurrencyProvider>
                <CartProvider> {/* ✅ wrap with CartProvider */}
                  <AnimationProvider>
                    <Header />
                    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
                      {children}
                    </main>
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                      }}
                    />
                    <WhatsAppButton phoneNumber="2348165510842" />
                  </AnimationProvider>
                </CartProvider>
              </CurrencyProvider>
            </MetaPixelProvider>
          </CartButtonRefProvider>
        </Suspense>
      </body>
    </html>
  );
}