"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:bottom-0 bg-white border-t border-gray-200 shadow-lg p-4 md:mb-0 mb-14"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              We use cookies to improve your experience on our website.
            </p>
            <div className="flex gap-3">
              <button
                onClick={acceptCookies}
                className="px-4 py-2 bg-gold text-navy font-bold rounded-full text-sm hover:scale-105 transition-transform"
              >
                Accept
              </button>
              <button
                onClick={declineCookies}
                className="px-4 py-2 border border-gold text-gold rounded-full text-sm hover:bg-gold hover:text-navy transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
