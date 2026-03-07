import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MetaPixelProvider } from "@/components/providers/meta-pixel-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { Header } from "@/components/layout/header";
import { Toaster } from "react-hot-toast";
import { AnimationProvider } from "@/components/providers/animation-provider";
import { LoadingProgress } from "@/components/loading-progress";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scale-Edge Marketing LTD",
  description: "Premium Products for the Modern Nigerian Consumer",
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
          <LoadingProgress />
        </Suspense>
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
      </body>
    </html>
  );
}