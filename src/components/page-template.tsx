"use client";

import { ReactNode, useEffect, useState } from "react";
import { ClientOnly } from "./client-only";

interface PageTemplateProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function PageTemplate({ children, fallback }: PageTemplateProps) {
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  useEffect(() => {
    setMounted(true);
    
    // Simulate content loading
    const timer = setTimeout(() => {
      setContent(children);
    }, 50);

    return () => clearTimeout(timer);
  }, [children]);

  if (!mounted) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ClientOnly>
      <div className="animate-fade-in">
        {content || children}
      </div>
    </ClientOnly>
  );
}