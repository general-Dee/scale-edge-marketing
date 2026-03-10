"use client";

import { useEffect, useState } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;      // optional because we have a default
  message?: string;
  position?: "bottom-right" | "bottom-left";
}

export default function WhatsAppButton({
  phoneNumber = "2348165510842",
  message = "Hello! I'm interested in your products. Can you help me?",
  position = "bottom-right",
}: WhatsAppButtonProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const positionClasses =
    position === "bottom-right"
      ? "bottom-4 right-4"
      : "bottom-4 left-4";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${positionClasses} z-50 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110`}
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-7 h-7 fill-current"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 106 32 11.9 126 12 243.9c0 37.2 10.2 73.6 29.5 105.2L12 479.2l132.5-28.6c31.2 16.9 66.5 25.8 102.3 25.8 117.9 0 213.9-94 213.9-212 0-56.6-22.1-110-62.1-150.3zM223.9 429.6c-30.4 0-60.3-8.2-86.2-23.5l-6.2-3.7-79.3 17.1 17-77.3-3.8-6.1c-16.2-26-24.8-56-24.8-86.9 0-98.5 80.1-178.6 178.8-178.6 47.7 0 92.5 18.6 126.2 52.4 33.7 33.8 52.2 78.6 52.2 126.4 0 98.5-80 178.6-178.6 178.6z" />
      </svg>
    </a>
  );
}