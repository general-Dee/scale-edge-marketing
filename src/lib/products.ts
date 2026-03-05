// src/lib/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
}

export const products: Record<string, Product> = {
  // SOLAR ESSENTIALS
  "solar-fan-pro": {
    id: "solar-fan-pro",
    name: "Solar Fan Pro Max",
    description: "48-hour battery backup, 3 speed settings, USB charging ports. Perfect for Nigerian homes experiencing power outages.",
    price: 65000,
    compareAtPrice: 85000,
    image: "/images/solar-fan-pro.jpg",
    category: "Solar Essentials",
    rating: 4.9,
    reviews: 342,
    inStock: true,
    features: [
      "48-hour battery backup",
      "3 speed settings",
      "2 USB charging ports",
      "Remote control included",
      "Quiet operation technology",
      "1 year warranty"
    ],
    specifications: {
      "Battery": "12V 20AH Lithium",
      "Charging Time": "6-8 hours (solar)",
      "Coverage": "Up to 200 sq ft",
      "Weight": "3.5 kg",
      "Warranty": "1 year"
    },
    tags: ["bestseller", "solar", "fan", "power backup"]
  },

  "solar-powerbank-30000": {
    id: "solar-powerbank-30000",
    name: "Solar PowerBank 30000mAh",
    description: "High-capacity power bank with solar charging. Charge 6 devices simultaneously. Perfect for outdoor events and power outages.",
    price: 38000,
    compareAtPrice: 48000,
    image: "/images/solar-powerbank.jpg",
    category: "Solar Essentials",
    rating: 4.8,
    reviews: 423,
    inStock: true,
    features: [
      "30000mAh capacity",
      "Solar charging capability",
      "6 device charging ports",
      "LED flashlight",
      "Fast charging technology",
      "6 months warranty"
    ],
    specifications: {
      "Capacity": "30000mAh",
      "Solar Charging": "Yes (10W)",
      "USB Ports": "4 USB-A + 2 USB-C",
      "Weight": "650g",
      "Charging Time": "8-10 hours",
      "Warranty": "6 months"
    },
    tags: ["solar", "powerbank", "portable", "charging"]
  },

  "solar-led-bulb": {
    id: "solar-led-bulb",
    name: "Solar LED Bulb with Remote",
    description: "Energy-efficient LED bulb with solar panel. 3 lighting modes, remote control, perfect for outdoor lighting or during power outages.",
    price: 12500,
    compareAtPrice: 18000,
    image: "/images/solar-bulb.jpg",
    category: "Solar Essentials",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    features: [
      "10W LED bulb",
      "3 lighting modes",
      "Remote control included",
      "Solar panel with 5m cable",
      "8-hour battery life",
      "1 year warranty"
    ],
    specifications: {
      "Brightness": "800 lumens",
      "Battery": "2000mAh Lithium",
      "Charging Time": "4-6 hours",
      "Modes": "Warm, Cool, Mixed",
      "Waterproof": "IP65",
      "Warranty": "1 year"
    },
    tags: ["solar", "lighting", "led", "outdoor"]
  },

  // SKINCARE PRODUCTS
  "shea-butter-deluxe": {
    id: "shea-butter-deluxe",
    name: "Deluxe Shea Butter Set",
    description: "100% organic, fair trade, 3-piece collection. Handcrafted with traditional Nigerian recipes for deep moisturizing.",
    price: 18500,
    compareAtPrice: 25000,
    image: "/images/shea-butter.jpg",
    category: "Skincare",
    rating: 4.8,
    reviews: 567,
    inStock: true,
    features: [
      "100% organic ingredients",
      "Fair trade certified",
      "3-piece collection",
      "6-month supply",
      "Cruelty-free",
      "Traditional recipe"
    ],
    specifications: {
      "Contents": "3 x 200g jars",
      "Ingredients": "Shea butter, Coconut oil, Vitamin E",
      "Shelf Life": "12 months",
      "Made in": "Nigeria",
      "Skin Type": "All skin types"
    },
    tags: ["skincare", "shea butter", "natural", "organic"]
  },

  "black-soap-set": {
    id: "black-soap-set",
    name: "Organic Black Soap Set",
    description: "Traditional Nigerian black soap set. 4 scents: Original, Lavender, Tea Tree, and Citrus. Handmade with natural ingredients.",
    price: 22500,
    compareAtPrice: 30000,
    image: "/images/black-soap.jpg",
    category: "Skincare",
    rating: 4.9,
    reviews: 678,
    inStock: true,
    features: [
      "4 scents included",
      "Handmade traditionally",
      "Natural ingredients",
      "No chemicals",
      "Suitable for face & body",
      "3-month supply"
    ],
    specifications: {
      "Contents": "4 x 150g bars",
      "Ingredients": "Plantain skins, Cocoa pod, Palm oil",
      "Scents": "Original, Lavender, Tea Tree, Citrus",
      "Made in": "Nigeria",
      "Shelf Life": "18 months"
    },
    tags: ["skincare", "black soap", "natural", "traditional"]
  },

  "coconut-oil-set": {
    id: "coconut-oil-set",
    name: "Virgin Coconut Oil Set",
    description: "Cold-pressed virgin coconut oil. Perfect for hair, skin, and cooking. Set includes 3 jars with different uses.",
    price: 16500,
    compareAtPrice: 22000,
    image: "/images/coconut-oil.jpg",
    category: "Skincare",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    features: [
      "Cold-pressed extraction",
      "Multi-purpose use",
      "3 jars included",
      "Food grade quality",
      "No additives",
      "6-month supply"
    ],
    specifications: {
      "Contents": "3 x 250ml jars",
      "Type": "Virgin Coconut Oil",
      "Extraction": "Cold-pressed",
      "Uses": "Skin, Hair, Cooking",
      "Shelf Life": "24 months"
    },
    tags: ["skincare", "coconut oil", "natural", "hair care"]
  },

  // HOME SOLUTIONS
  "foldable-laundry-rack": {
    id: "foldable-laundry-rack",
    name: "Space Saver Foldable Laundry Rack",
    description: "Heavy-duty foldable laundry rack for small apartments. Holds up to 15kg of clothes, folds flat when not in use.",
    price: 18500,
    compareAtPrice: 25000,
    image: "/images/laundry-rack.jpg",
    category: "Home Solutions",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    features: [
      "Folds flat for storage",
      "15kg weight capacity",
      "Rust-resistant coating",
      "2-tier design",
      "No assembly required",
      "1 year warranty"
    ],
    specifications: {
      "Dimensions": "60 x 40 x 90 cm",
      "Folded Size": "60 x 40 x 5 cm",
      "Material": "Stainless steel",
      "Capacity": "15kg",
      "Color": "Silver",
      "Warranty": "1 year"
    },
    tags: ["home", "laundry", "space-saver", "organization"]
  },

  "modular-shelving-system": {
    id: "modular-shelving-system",
    name: "Modular Shelving System",
    description: "Customizable shelving system for small spaces. Mix and match cubes to create your ideal storage solution.",
    price: 45000,
    compareAtPrice: 58000,
    image: "/images/shelving.jpg",
    category: "Home Solutions",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    features: [
      "Modular design",
      "5 cubes included",
      "Easy assembly",
      "Wall-mountable",
      "Multiple configurations",
      "2 year warranty"
    ],
    specifications: {
      "Cubes": "5 pieces",
      "Cube Size": "35 x 35 x 35 cm",
      "Material": "Engineered wood",
      "Max Load": "10kg per cube",
      "Assembly": "DIY with tools included"
    },
    tags: ["home", "furniture", "storage", "organization"]
  },

  "under-bed-storage": {
    id: "under-bed-storage",
    name: "Under Bed Storage Containers (4-Pack)",
    description: "Maximize space with these rolling under-bed storage containers. Clear design lets you see contents easily.",
    price: 22500,
    compareAtPrice: 30000,
    image: "/images/storage.jpg",
    category: "Home Solutions",
    rating: 4.6,
    reviews: 98,
    inStock: true,
    features: [
      "Set of 4 containers",
      "Rolling wheels included",
      "Clear design",
      "Dust-proof lid",
      "Stackable when not in use",
      "6 months warranty"
    ],
    specifications: {
      "Dimensions": "80 x 40 x 15 cm each",
      "Material": "Clear plastic",
      "Capacity": "50L per container",
      "Features": "Wheels, handles, lids",
      "Color": "Clear/White"
    },
    tags: ["home", "storage", "organization", "space-saver"]
  },

  // FRAGRANCE COLLECTION
  "oud-perfume-collection": {
    id: "oud-perfume-collection",
    name: "Oud Perfume Collection",
    description: "Premium Oud fragrances set. 3 distinct Oud scents perfect for special occasions and daily wear.",
    price: 42000,
    compareAtPrice: 55000,
    image: "/images/oud.jpg",
    category: "Fragrance",
    rating: 4.9,
    reviews: 234,
    inStock: true,
    features: [
      "3 premium Oud scents",
      "Long-lasting formula",
      "50ml each bottle",
      "Luxury packaging",
      "Gift box included",
      "Made in UAE"
    ],
    specifications: {
      "Contents": "3 x 50ml bottles",
      "Scents": "Black Oud, Royal Oud, Musk Oud",
      "Type": "Perfume oil",
      "Longevity": "8-12 hours",
      "Gender": "Unisex"
    },
    tags: ["fragrance", "oud", "luxury", "gift"]
  },

  "designer-fragrance-set": {
    id: "designer-fragrance-set",
    name: "Designer Fragrance Discovery Set",
    description: "Explore 5 designer-inspired fragrances. Perfect for finding your signature scent or as a gift set.",
    price: 35000,
    compareAtPrice: 45000,
    image: "/images/fragrance-set.jpg",
    category: "Fragrance",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    features: [
      "5 designer-inspired scents",
      "20ml each bottle",
      "Travel-friendly size",
      "Scent guide included",
      "Gift box packaging",
      "6 months shelf life"
    ],
    specifications: {
      "Contents": "5 x 20ml bottles",
      "Scents": "Citrus, Floral, Woody, Oriental, Fresh",
      "Type": "Eau de Parfum",
      "Longevity": "6-8 hours",
      "Gender": "Unisex"
    },
    tags: ["fragrance", "designer", "gift", "discovery"]
  },

  "arabian-attar-set": {
    id: "arabian-attar-set",
    name: "Arabian Attar Oil Set",
    description: "Traditional Arabian attar (oil-based perfume) set. 6 concentrated oils in beautiful glass bottles.",
    price: 28500,
    compareAtPrice: 38000,
    image: "/images/attar.jpg",
    category: "Fragrance",
    rating: 4.9,
    reviews: 145,
    inStock: true,
    features: [
      "6 traditional attars",
      "Oil-based formula",
      "Concentrated scents",
      "Glass roll-on bottles",
      "Pouch included",
      "Long-lasting"
    ],
    specifications: {
      "Contents": "6 x 10ml roll-ons",
      "Scents": "Rose, Musk, Amber, Sandal, Jasmine, Oud",
      "Type": "Attar oil",
      "Longevity": "10-12 hours",
      "Origin": "Saudi Arabia"
    },
    tags: ["fragrance", "attar", "arabian", "oil-based"]
  }
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return Object.values(products).filter(product => product.category === category);
};

// Helper function to get featured products
export const getFeaturedProducts = (count: number = 8): Product[] => {
  return Object.values(products).slice(0, count);
};

// Helper function to get bestsellers
export const getBestsellers = (): Product[] => {
  return Object.values(products).filter(product => product.tags.includes("bestseller"));
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return Object.values(products).filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

// Categories for navigation
export const categories = [
  { name: "Solar Essentials", icon: "☀️", count: getProductsByCategory("Solar Essentials").length },
  { name: "Skincare", icon: "🧴", count: getProductsByCategory("Skincare").length },
  { name: "Home Solutions", icon: "🏠", count: getProductsByCategory("Home Solutions").length },
  { name: "Fragrance", icon: "🌸", count: getProductsByCategory("Fragrance").length },
];