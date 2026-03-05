import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MetaPixelProvider } from "@/components/providers/meta-pixel-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { Header } from "@/components/layout/header";
import { Toaster } from "react-hot-toast";

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
        <script src="https://js.paystack.co/v1/inline.js"></script>
      </head>
      <body className={inter.className}>
        <MetaPixelProvider>
          <CartProvider>
            <Header />
            {children}
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
          </CartProvider>
        </MetaPixelProvider>
      </body>
    </html>
  );
}