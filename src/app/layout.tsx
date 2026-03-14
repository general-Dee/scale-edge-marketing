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

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Scale-Edge Marketing',
    template: '%s | Scale-Edge Marketing',
  },
  description: 'Premium gadgets and solar solutions for the modern Nigerian consumer.',
  keywords: ['gadgets', 'phones', 'laptops', 'solar', 'Nigeria', 'online store'],
  authors: [{ name: 'Scale-Edge Marketing' }],
  openGraph: {
    title: 'Scale-Edge Marketing',
    description: 'Premium gadgets and solar solutions for Nigeria.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Scale-Edge Marketing',
    images: [
      {
        url: '/og-image.jpg', // create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scale-Edge Marketing',
    description: 'Premium gadgets and solar solutions for Nigeria.',
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
    google: 'your-google-verification-code', // optional
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
              <CartProvider>
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
            </MetaPixelProvider>
          </CartButtonRefProvider>
        </Suspense>
      </body>
    </html>
  );
}