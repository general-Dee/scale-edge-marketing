import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MetaPixelProvider } from '@/components/providers/meta-pixel-provider';
import { CartProvider } from '@/components/cart/cart-provider';
import { Header } from '@/components/layout/header';
import { Toaster } from 'react-hot-toast';
import { AnimationProvider } from '@/components/providers/animation-provider';
import { CartButtonRefProvider } from '@/contexts/CartButtonRefContext';
import { Suspense } from 'react';
import WhatsAppButton from '@/components/whatsapp-button';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Voltream',
    template: '%s | Voltream',
  },
  description: 'Premium gadgets and solar solutions for the modern African consumer.',
  keywords: ['gadgets', 'phones', 'laptops', 'solar', 'Africa', 'online store'],
  authors: [{ name: 'Voltream' }],
  openGraph: {
    title: 'Voltream',
    description: 'Premium gadgets and solar solutions for Africa.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Voltream',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_AF',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voltream',
    description: 'Premium gadgets and solar solutions for Africa.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
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
                <CartProvider>
                  <AnimationProvider>
                    <Header />
                    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
                      {children}
                    </main>
                    <Footer />
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