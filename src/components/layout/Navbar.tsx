"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "@/lib/constants";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold font-syne">
              <span className="text-gold">Scale-Edge</span>
              <span className="text-navy"> Marketing LTD</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-navy hover:text-gold font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-gold text-navy font-bold px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Book a Call
            </Link>
            <a
              href={CONTACT.telLink}
              className="text-gold font-medium flex items-center gap-1 hover:underline"
            >
              <Phone size={16} />
              {CONTACT.phone}
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navy"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-navy hover:text-gold font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="bg-gold text-navy font-bold px-6 py-3 rounded-full text-center"
              >
                Book a Call
              </Link>
              <a
                href={CONTACT.telLink}
                className="bg-navy text-white font-bold px-6 py-3 rounded-full text-center flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Call Us Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
