// src/lib/products.ts
// This file contains category definitions and helper functions.
// Product data is stored in Supabase.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number;
  image_urls: string[];
  category: string;
  brand: string;
  rating: number;
  review_count: number;
  in_stock: boolean;
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
}

// Category definitions for navigation and UI
export const categories = [
  { name: "Phones", icon: "📱", slug: "phones" },
  { name: "Tablets", icon: "📟", slug: "tablets" },
  { name: "Laptops", icon: "💻", slug: "laptops" },
  { name: "Headphones", icon: "🎧", slug: "headphones" },
  { name: "Speakers", icon: "🔊", slug: "speakers" },
  { name: "Smart Watches", icon: "⌚", slug: "smart-watches" },
  { name: "Solar Solutions", icon: "☀️", slug: "solar-solutions" },
];

// Helper to get category icon (used in product pages and category cards)
export function getCategoryIcon(categoryName: string): string {
  const icons: Record<string, string> = {
    "Phones": "📱",
    "Tablets": "📟",
    "Laptops": "💻",
    "Headphones": "🎧",
    "Speakers": "🔊",
    "Smart Watches": "⌚",
    "Solar Solutions": "☀️",
  };
  return icons[categoryName] || "📦";
}

// Helper to get category color (for backgrounds in light mode)
export function getCategoryColor(categoryName: string): string {
  const colors: Record<string, string> = {
    "Phones": "bg-blue-100",
    "Tablets": "bg-purple-100",
    "Laptops": "bg-indigo-100",
    "Headphones": "bg-pink-100",
    "Speakers": "bg-cyan-100",
    "Smart Watches": "bg-green-100",
    "Solar Solutions": "bg-amber-100",
  };
  return colors[categoryName] || "bg-gray-100";
}

// Helper to get category gradient (for category cards)
export function getCategoryGradient(categoryName: string): string {
  const gradients: Record<string, string> = {
    "Phones": "from-blue-500 to-blue-600",
    "Tablets": "from-purple-500 to-purple-600",
    "Laptops": "from-indigo-500 to-indigo-600",
    "Headphones": "from-pink-500 to-pink-600",
    "Speakers": "from-cyan-500 to-cyan-600",
    "Smart Watches": "from-green-500 to-green-600",
    "Solar Solutions": "from-amber-500 to-amber-600",
  };
  return gradients[categoryName] || "from-gray-500 to-gray-600";
}

// Helper to get dark mode variant of category color (used in homepage)
export function getCategoryColorDark(categoryName: string): string {
  const colors: Record<string, string> = {
    "Phones": "dark:bg-blue-900/30",
    "Tablets": "dark:bg-purple-900/30",
    "Laptops": "dark:bg-indigo-900/30",
    "Headphones": "dark:bg-pink-900/30",
    "Speakers": "dark:bg-cyan-900/30",
    "Smart Watches": "dark:bg-green-900/30",
    "Solar Solutions": "dark:bg-amber-900/30",
  };
  return colors[categoryName] || "dark:bg-gray-800";
}