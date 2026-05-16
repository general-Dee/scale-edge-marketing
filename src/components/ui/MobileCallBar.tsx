"use client";

import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden h-14 bg-white border-t border-gray-200 shadow-lg">
      <a
        href={CONTACT.telLink}
        className="flex-1 flex items-center justify-center gap-2 bg-navy text-white font-bold"
      >
        <Phone size={18} />
        Call Us
      </a>
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 bg-whatsapp text-white font-bold"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
