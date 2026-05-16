"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/constants";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 hidden md:flex items-center justify-center w-14 h-14 bg-whatsapp rounded-full shadow-lg hover:scale-110 transition-transform"
      whileHover={{ scale: 1.1 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <MessageCircle className="text-white" size={28} />
    </motion.a>
  );
}
