import type { Metadata } from "next";
import "./globals.css";
import { MetaPixelProvider } from "@/components/providers/meta-pixel-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { Header } from "@/components/layout/header";
import { Toaster } from "react-hot-toast";
import { AnimationProvider } from "@/components/providers/animation-provider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Scale-Edge Marketing LTD",
  description: "Premium Products for the Modern Nigerian Consumer",
};

// No font imports needed - Tailwind provides font-sans by default
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
      <body className="font-sans antialiased min-h-screen bg-gray-50 dark:bg-gray-900">
        <Suspense fallback={null}>
          <MetaPixelProvider>
            <CartProvider>
              <AnimationProvider>
                <Header />
                <main className="min-h-screen">
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
              </AnimationProvider>
            </CartProvider>
          </MetaPixelProvider>
        </Suspense>
      </body>
    </html>
  );
}