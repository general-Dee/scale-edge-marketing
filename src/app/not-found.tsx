import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gold font-syne">404</h1>
        <p className="text-2xl text-white mt-4">This page doesn't exist —</p>
        <p className="text-xl text-gray-300 mt-2">but your business growth does.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/" className="bg-gold text-navy font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
            ← Go Back Home
          </Link>
          <a href={CONTACT.telLink} className="border-2 border-gold text-gold px-8 py-3 rounded-full hover:bg-gold hover:text-navy transition-all">
            📞 Call Us: {CONTACT.phone}
          </a>
        </div>
      </div>
    </div>
  );
}