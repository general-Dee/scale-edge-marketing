import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, Clock, MessageCircle } from "lucide-react";
import { CONTACT, OFFICES, BRAND } from "@/lib/constants";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-syne mb-4">
              <span className="text-gold">Scale-Edge</span>
              <span> Marketing LTD</span>
            </h3>
            <p className="text-gray-300 text-sm mb-4">{BRAND.tagline}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          {OFFICES.map((office) => (
            <div key={office.name}>
              <h4 className="font-bold text-gold mb-3">{office.name}</h4>
              <address className="not-italic text-gray-300 text-sm space-y-2">
                <p>{office.address}</p>
                <p>{office.city}</p>
                <a href={CONTACT.telLink} className="block hover:text-gold transition-colors">
                  📞 {office.phone}
                </a>
              </address>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href={`mailto:${CONTACT.email}`} className="hover:text-gold flex items-center gap-1">
              <Mail size={14} /> {CONTACT.email}
            </a>
            <a href={CONTACT.telLink} className="hover:text-gold flex items-center gap-1">
              <Phone size={14} /> {CONTACT.phone}
            </a>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {CONTACT.hours}
            </span>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-1">
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
          <p>© 2025 Scale-Edge Marketing LTD. {BRAND.rc}</p>
        </div>
      </div>
    </footer>
  );
}
