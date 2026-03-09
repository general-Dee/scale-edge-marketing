"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export type PixelEvent = 
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "AddToWishlist"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "Subscribe"
  | "CustomizeProduct";

export interface PixelParams {
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: "product" | "product_group";
  value?: number;
  currency?: string;
  num_items?: number;
  search_string?: string;
  status?: string;
  [key: string]: any;
}

interface MetaPixelContextType {
  trackEvent: (event: PixelEvent, params?: PixelParams) => void;
  trackPurchase: (value: number, currency: string, contentIds: string[], params?: PixelParams) => void;
  trackAddToCart: (productId: string, value: number, currency: string, params?: PixelParams) => void;
  trackViewContent: (contentName: string, contentIds: string[], value?: number, currency?: string) => void;
  trackLead: (value?: number, currency?: string, params?: PixelParams) => void;
}

const MetaPixelContext = createContext<MetaPixelContextType | undefined>(undefined);

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPixelLoaded, setIsPixelLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Only attempt to load the pixel if we have a valid ID
  const shouldLoadPixel = PIXEL_ID && PIXEL_ID !== "YOUR_PIXEL_ID";

  useEffect(() => {
    if (shouldLoadPixel && scriptLoaded && typeof window !== "undefined" && window.fbq) {
      setIsPixelLoaded(true);
      // Track initial page view
      window.fbq("track", "PageView");
    }
  }, [scriptLoaded, shouldLoadPixel]);

  useEffect(() => {
    if (isPixelLoaded && window.fbq) {
      // Track page views on route change
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams, isPixelLoaded]);

  // No-op functions when pixel not loaded
  const trackEvent = (event: PixelEvent, params: PixelParams = {}) => {
    if (isPixelLoaded && window.fbq) {
      const eventId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      window.fbq("track", event, params, { eventID: eventId });
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log('Meta Pixel not loaded – tracking suppressed', event, params);
      }
    }
  };

  const trackPurchase = (value: number, currency: string, contentIds: string[], params: PixelParams = {}) => {
    trackEvent("Purchase", {
      value,
      currency,
      content_ids: contentIds,
      content_type: "product",
      num_items: contentIds.length,
      ...params
    });
  };

  const trackAddToCart = (productId: string, value: number, currency: string, params: PixelParams = {}) => {
    trackEvent("AddToCart", {
      content_ids: [productId],
      content_type: "product",
      value,
      currency,
      ...params
    });
  };

  const trackViewContent = (contentName: string, contentIds: string[], value?: number, currency: string = "NGN") => {
    trackEvent("ViewContent", {
      content_name: contentName,
      content_ids: contentIds,
      content_type: "product",
      value,
      currency
    });
  };

  const trackLead = (value?: number, currency: string = "NGN", params: PixelParams = {}) => {
    trackEvent("Lead", {
      value,
      currency,
      ...params
    });
  };

  return (
    <MetaPixelContext.Provider
      value={{
        trackEvent,
        trackPurchase,
        trackAddToCart,
        trackViewContent,
        trackLead,
      }}
    >
      {shouldLoadPixel && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${PIXEL_ID}');
            `,
          }}
        />
      )}
      {shouldLoadPixel && (
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}
      {children}
    </MetaPixelContext.Provider>
  );
}

export function useMetaPixel() {
  const context = useContext(MetaPixelContext);
  if (context === undefined) {
    throw new Error("useMetaPixel must be used within a MetaPixelProvider");
  }
  return context;
}

declare global {
  interface Window {
    fbq: any;
  }
}