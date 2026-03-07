// src/lib/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
}

export const products: Record<string, Product> = {
  // ===========================================
  // PHONES
  // ===========================================
  "iphone-15-pro-max": {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    description: "Apple's most advanced iPhone with A17 Pro chip, titanium design, and pro camera system.",
    price: 1200000,
    compareAtPrice: 1350000,
    image: "/images/products/iphone-15-pro-max.jpg",
    category: "Phones",
    brand: "Apple",
    rating: 4.9,
    reviews: 1245,
    inStock: true,
    features: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "48MP Main camera system",
      "Titanium design",
      "USB-C connector",
      "Up to 29 hours video playback"
    ],
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      "Battery": "Up to 29 hours",
      "Storage": "256GB/512GB/1TB",
      "Colors": "Natural Titanium, Blue Titanium"
    },
    tags: ["bestseller", "apple", "iphone", "premium"]
  },

  "iphone-15-pro": {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    description: "Powerful A17 Pro chip, titanium design, and pro camera system in a compact size.",
    price: 950000,
    compareAtPrice: 1050000,
    image: "/images/products/iphone-15-pro.jpg",
    category: "Phones",
    brand: "Apple",
    rating: 4.8,
    reviews: 892,
    inStock: true,
    features: [
      "6.1-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "48MP Main camera system",
      "Titanium design",
      "Action button",
      "Up to 23 hours video playback"
    ],
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
      "Battery": "Up to 23 hours",
      "Storage": "128GB/256GB/512GB/1TB",
      "Colors": "Natural Titanium, Blue Titanium"
    },
    tags: ["apple", "iphone", "premium"]
  },

  "samsung-s24-ultra": {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    description: "The ultimate smartphone with Galaxy AI, titanium build, and 200MP camera.",
    price: 1150000,
    compareAtPrice: 1250000,
    image: "/images/products/samsung-s24-ultra.jpg",
    category: "Phones",
    brand: "Samsung",
    rating: 4.9,
    reviews: 1123,
    inStock: true,
    features: [
      "6.8-inch Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 3 chip",
      "200MP Main camera system",
      "Built-in S Pen",
      "Galaxy AI features",
      "5000mAh battery"
    ],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X, 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "200MP Main + 50MP Telephoto + 12MP Ultra Wide",
      "Battery": "5000mAh",
      "Storage": "256GB/512GB/1TB",
      "S Pen": "Built-in"
    },
    tags: ["bestseller", "samsung", "android", "premium"]
  },

  "samsung-s24-plus": {
    id: "samsung-s24-plus",
    name: "Samsung Galaxy S24+",
    description: "Premium smartphone with Galaxy AI and pro-grade camera.",
    price: 850000,
    compareAtPrice: 920000,
    image: "/images/products/samsung-s24-plus.jpg",
    category: "Phones",
    brand: "Samsung",
    rating: 4.7,
    reviews: 678,
    inStock: true,
    features: [
      "6.7-inch Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 3 chip",
      "50MP Main camera",
      "Galaxy AI features",
      "4900mAh battery",
      "12GB RAM"
    ],
    specifications: {
      "Display": "6.7-inch Dynamic AMOLED 2X, 120Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "50MP Main + 12MP Ultra Wide + 10MP Telephoto",
      "Battery": "4900mAh",
      "Storage": "256GB/512GB",
      "RAM": "12GB"
    },
    tags: ["samsung", "android", "premium"]
  },

  "pixel-8-pro": {
    id: "pixel-8-pro",
    name: "Google Pixel 8 Pro",
    description: "The best Google AI smartphone with pro camera and advanced temperature sensor.",
    price: 920000,
    compareAtPrice: 1000000,
    image: "/images/products/pixel-8-pro.jpg",
    category: "Phones",
    brand: "Pixel",
    rating: 4.8,
    reviews: 678,
    inStock: true,
    features: [
      "6.7-inch Super Actua display",
      "Google Tensor G3 chip",
      "Triple pro camera system",
      "Temperature sensor",
      "7 years of OS updates",
      "5050mAh battery"
    ],
    specifications: {
      "Display": "6.7-inch Super Actua, 120Hz",
      "Processor": "Google Tensor G3",
      "Camera": "50MP Main + 48MP Ultra Wide + 48MP Telephoto",
      "Battery": "5050mAh",
      "Storage": "128GB/256GB/512GB",
      "AI Features": "Magic Editor, Audio Magic Eraser"
    },
    tags: ["pixel", "google", "android", "premium"]
  },

  "pixel-8": {
    id: "pixel-8",
    name: "Google Pixel 8",
    description: "Advanced AI smartphone with pro controls and compact design.",
    price: 680000,
    compareAtPrice: 750000,
    image: "/images/products/pixel-8.jpg",
    category: "Phones",
    brand: "Pixel",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    features: [
      "6.2-inch Actua display",
      "Google Tensor G3 chip",
      "Dual pro camera system",
      "7 years of OS updates",
      "Best Take and Magic Editor",
      "4485mAh battery"
    ],
    specifications: {
      "Display": "6.2-inch Actua, 120Hz",
      "Processor": "Google Tensor G3",
      "Camera": "50MP Main + 12MP Ultra Wide",
      "Battery": "4485mAh",
      "Storage": "128GB/256GB",
      "AI Features": "Best Take, Magic Editor"
    },
    tags: ["pixel", "google", "android"]
  },

  // ===========================================
  // TABLETS
  // ===========================================
  "ipad-pro-12-9": {
    id: "ipad-pro-12-9",
    name: "iPad Pro 12.9-inch (6th Gen)",
    description: "Ultimate iPad experience with M2 chip, XDR display, and pro features.",
    price: 850000,
    compareAtPrice: 950000,
    image: "/images/products/ipad-pro.jpg",
    category: "Tablets",
    brand: "Apple",
    rating: 4.9,
    reviews: 567,
    inStock: true,
    features: [
      "12.9-inch Liquid Retina XDR display",
      "M2 chip with 16-core Neural Engine",
      "12MP Wide and 10MP Ultra Wide cameras",
      "5G capable",
      "Face ID",
      "Thunderbolt / USB 4 port"
    ],
    specifications: {
      "Display": "12.9-inch Liquid Retina XDR",
      "Chip": "Apple M2",
      "Storage": "128GB/256GB/512GB/1TB/2TB",
      "Camera": "12MP Wide + 10MP Ultra Wide",
      "Battery": "Up to 10 hours",
      "Connectivity": "Wi-Fi 6E, 5G"
    },
    tags: ["apple", "ipad", "premium", "pro"]
  },

  "ipad-air": {
    id: "ipad-air",
    name: "iPad Air (5th Gen)",
    description: "Powerful M1 chip, stunning design, and all-screen display.",
    price: 550000,
    compareAtPrice: 600000,
    image: "/images/products/ipad-air.jpg",
    category: "Tablets",
    brand: "Apple",
    rating: 4.8,
    reviews: 789,
    inStock: true,
    features: [
      "10.9-inch Liquid Retina display",
      "M1 chip with Neural Engine",
      "12MP Ultra Wide front camera",
      "Touch ID in top button",
      "5G capable",
      "USB-C connector"
    ],
    specifications: {
      "Display": "10.9-inch Liquid Retina",
      "Chip": "Apple M1",
      "Storage": "64GB/256GB",
      "Camera": "12MP Wide",
      "Battery": "Up to 10 hours",
      "Colors": "Blue, Purple, Pink, Starlight, Space Gray"
    },
    tags: ["apple", "ipad", "popular"]
  },

  "samsung-tab-s9-ultra": {
    id: "samsung-tab-s9-ultra",
    name: "Samsung Galaxy Tab S9 Ultra",
    description: "The ultimate tablet for productivity and entertainment with massive display and S Pen.",
    price: 780000,
    compareAtPrice: 850000,
    image: "/images/products/samsung-tab-s9-ultra.jpg",
    category: "Tablets",
    brand: "Samsung",
    rating: 4.8,
    reviews: 345,
    inStock: true,
    features: [
      "14.6-inch Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 2 chip",
      "S Pen included",
      "IP68 water and dust resistance",
      "Quad speakers with Dolby Atmos",
      "11200mAh battery"
    ],
    specifications: {
      "Display": "14.6-inch Dynamic AMOLED 2X, 120Hz",
      "Processor": "Snapdragon 8 Gen 2",
      "Storage": "256GB/512GB/1TB",
      "RAM": "12GB/16GB",
      "Battery": "11200mAh",
      "Water Resistance": "IP68"
    },
    tags: ["samsung", "tablet", "premium"]
  },

  // ===========================================
  // SPEAKERS
  // ===========================================
  "sony-xg300": {
    id: "sony-xg300",
    name: "Sony XG300 Portable Speaker",
    description: "Powerful portable speaker with X-Balanced speaker unit and EXTRA BASS.",
    price: 185000,
    compareAtPrice: 210000,
    image: "/images/products/sony-speaker.jpg",
    category: "Speakers",
    brand: "Sony",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    features: [
      "X-Balanced Speaker Unit",
      "EXTRA BASS for deep sound",
      "Up to 25 hours battery",
      "Quick charging (10 min = 70 min play)",
      "Water resistant (IP67)",
      "Party Connect for multiple speakers"
    ],
    specifications: {
      "Battery": "Up to 25 hours",
      "Water Resistance": "IP67",
      "Charging": "USB-C",
      "Connectivity": "Bluetooth 5.0",
      "Power Output": "25W",
      "Weight": "1.2kg"
    },
    tags: ["sony", "speaker", "audio", "portable"]
  },

  "samsung-mx-st50b": {
    id: "samsung-mx-st50b",
    name: "Samsung MX-ST50B Sound Tower",
    description: "Powerful all-in-one sound system with dynamic lighting and karaoke features.",
    price: 320000,
    compareAtPrice: 350000,
    image: "/images/products/samsung-speaker.jpg",
    category: "Speakers",
    brand: "Samsung",
    rating: 4.6,
    reviews: 123,
    inStock: true,
    features: [
      "Powerful sound with dynamic bass",
      "Dynamic lighting effects",
      "Karaoke features",
      "Bluetooth connectivity",
      "USB recording",
      "Multi-device pairing"
    ],
    specifications: {
      "Power": "300W",
      "Speakers": "2-way speaker system",
      "Connectivity": "Bluetooth, USB, AUX",
      "Features": "Karaoke, Dynamic Light",
      "Dimensions": "330 x 700 x 330 mm",
      "Weight": "8.5kg"
    },
    tags: ["samsung", "speaker", "audio", "party"]
  },

  "sony-ult-field-1": {
    id: "sony-ult-field-1",
    name: "Sony ULT FIELD 1 Portable Speaker",
    description: "Compact but powerful portable speaker with ULT button for deep bass.",
    price: 145000,
    compareAtPrice: 165000,
    image: "/images/products/sony-ult-speaker.jpg",
    category: "Speakers",
    brand: "Sony",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    features: [
      "ULT button for deep bass",
      "Sound Diffusion Processor",
      "Up to 12 hours battery",
      "Water resistant (IP67)",
      "Dustproof and shockproof",
      "Compact and portable"
    ],
    specifications: {
      "Battery": "Up to 12 hours",
      "Water Resistance": "IP67",
      "Charging": "USB-C",
      "Connectivity": "Bluetooth 5.2",
      "Power Output": "16W",
      "Weight": "650g"
    },
    tags: ["sony", "speaker", "portable", "bestseller"]
  },

  // ===========================================
  // EARPIECES / HEADSETS
  // ===========================================
  "airpods-pro-2": {
    id: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    description: "Industry-leading noise cancellation with adaptive audio and personalized spatial audio.",
    price: 245000,
    compareAtPrice: 280000,
    image: "/images/products/airpods-pro.jpg",
    category: "Earpieces",
    brand: "Apple",
    rating: 4.9,
    reviews: 2341,
    inStock: true,
    features: [
      "Active Noise Cancellation",
      "Adaptive Audio",
      "Personalized Spatial Audio",
      "Touch control for media playback",
      "MagSafe Charging Case",
      "Up to 6 hours listening time"
    ],
    specifications: {
      "Type": "In-ear wireless earbuds",
      "Noise Cancellation": "Yes, Active",
      "Battery": "6 hours (30h with case)",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IP54",
      "Chip": "H2"
    },
    tags: ["bestseller", "apple", "airpods", "audio"]
  },

  "airpods-3": {
    id: "airpods-3",
    name: "AirPods (3rd Gen)",
    description: "Spatial audio, force sensor control, and sweat-resistant design.",
    price: 165000,
    compareAtPrice: 185000,
    image: "/images/products/airpods-3.jpg",
    category: "Earpieces",
    brand: "Apple",
    rating: 4.7,
    reviews: 1567,
    inStock: true,
    features: [
      "Spatial Audio with dynamic head tracking",
      "Force sensor control",
      "Sweat and water resistant",
      "MagSafe Charging Case",
      "Up to 6 hours listening time",
      "Adaptive EQ"
    ],
    specifications: {
      "Type": "In-ear wireless earbuds",
      "Noise Cancellation": "No",
      "Battery": "6 hours (30h with case)",
      "Connectivity": "Bluetooth 5.0",
      "Water Resistance": "IPX4",
      "Chip": "H1"
    },
    tags: ["apple", "airpods", "audio"]
  },

  "sony-wh-1000xm5": {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling headphones with exceptional sound quality.",
    price: 320000,
    compareAtPrice: 350000,
    image: "/images/products/sony-headphones.jpg",
    category: "Earpieces",
    brand: "Sony",
    rating: 4.9,
    reviews: 892,
    inStock: true,
    features: [
      "Industry-leading noise cancellation",
      "Integrated Processor V1",
      "Crystal clear hands-free calling",
      "Multipoint connection",
      "Up to 30 hours battery",
      "Quick charging (3 min = 3 hours)"
    ],
    specifications: {
      "Type": "Over-ear wireless headphones",
      "Noise Cancellation": "Yes, Industry-leading",
      "Battery": "Up to 30 hours",
      "Connectivity": "Bluetooth 5.2",
      "Weight": "250g",
      "Charging": "USB-C"
    },
    tags: ["sony", "headphones", "premium", "noise-cancelling"]
  },

  "samsung-buds2-pro": {
    id: "samsung-buds2-pro",
    name: "Samsung Galaxy Buds2 Pro",
    description: "Premium earbuds with intelligent ANC and 24-bit Hi-Fi audio.",
    price: 165000,
    compareAtPrice: 185000,
    image: "/images/products/samsung-buds2-pro.jpg",
    category: "Earpieces",
    brand: "Samsung",
    rating: 4.7,
    reviews: 892,
    inStock: true,
    features: [
      "Intelligent Active Noise Cancellation",
      "24-bit Hi-Fi audio",
      "360 Audio with multi-channel",
      "Voice Detect",
      "IPX7 water resistance",
      "5 hours battery (18h with case)"
    ],
    specifications: {
      "Type": "In-ear wireless earbuds",
      "Noise Cancellation": "Yes, Intelligent ANC",
      "Battery": "5 hours (18h with case)",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX7",
      "Audio": "24-bit Hi-Fi"
    },
    tags: ["samsung", "audio", "popular"]
  },

  "pixel-buds-pro": {
    id: "pixel-buds-pro",
    name: "Google Pixel Buds Pro",
    description: "Premium earbuds with Active Noise Cancellation and seamless Google integration.",
    price: 145000,
    compareAtPrice: 165000,
    image: "/images/products/pixel-buds.jpg",
    category: "Earpieces",
    brand: "Pixel",
    rating: 4.6,
    reviews: 456,
    inStock: true,
    features: [
      "Active Noise Cancellation",
      "Google Assistant built-in",
      "Multipoint connectivity",
      "Wireless charging",
      "IPX4 water resistance",
      "11 hours battery"
    ],
    specifications: {
      "Type": "In-ear wireless earbuds",
      "Noise Cancellation": "Yes, ANC",
      "Battery": "11 hours (31h with case)",
      "Connectivity": "Bluetooth 5.0",
      "Water Resistance": "IPX4",
      "Assistant": "Google Assistant"
    },
    tags: ["pixel", "google", "audio"]
  },

  // ===========================================
  // SMART WATCHES
  // ===========================================
  "apple-watch-ultra-2": {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2",
    description: "The most rugged and capable Apple Watch, designed for endurance athletes and adventurers.",
    price: 620000,
    compareAtPrice: 680000,
    image: "/images/products/apple-watch-ultra.jpg",
    category: "Smart Watches",
    brand: "Apple",
    rating: 4.9,
    reviews: 456,
    inStock: true,
    features: [
      "49mm titanium case",
      "Always-On Retina display (3000 nits)",
      "Dual-frequency GPS",
      "Water resistant to 100m",
      "Siren and 86dB emergency siren",
      "Up to 36 hours battery life"
    ],
    specifications: {
      "Display": "49mm Always-On Retina",
      "Case Material": "Titanium",
      "Water Resistance": "100m",
      "Battery": "Up to 36 hours",
      "Connectivity": "GPS + Cellular",
      "Sensors": "Blood Oxygen, ECG, Heart rate"
    },
    tags: ["apple", "watch", "ultra", "premium"]
  },

  "apple-watch-series-9": {
    id: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    description: "Powerful features to help you stay connected, active, and healthy.",
    price: 350000,
    compareAtPrice: 390000,
    image: "/images/products/apple-watch-9.jpg",
    category: "Smart Watches",
    brand: "Apple",
    rating: 4.8,
    reviews: 892,
    inStock: true,
    features: [
      "Always-On Retina display",
      "S9 chip with 4-core Neural Engine",
      "Double tap gesture",
      "Blood Oxygen and ECG apps",
      "Temperature sensing",
      "Water resistant to 50m"
    ],
    specifications: {
      "Display": "41mm or 45mm Always-On Retina",
      "Case Material": "Aluminum or Stainless Steel",
      "Water Resistance": "50m",
      "Battery": "Up to 18 hours",
      "Connectivity": "GPS or GPS + Cellular",
      "Sensors": "Blood Oxygen, ECG, Heart rate"
    },
    tags: ["apple", "watch", "popular"]
  },

  "samsung-watch6-classic": {
    id: "samsung-watch6-classic",
    name: "Samsung Galaxy Watch6 Classic",
    description: "Premium smartwatch with rotating bezel and advanced health tracking.",
    price: 280000,
    compareAtPrice: 310000,
    image: "/images/products/samsung-watch6.jpg",
    category: "Smart Watches",
    brand: "Samsung",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    features: [
      "47mm stainless steel case",
      "Rotating bezel navigation",
      "Samsung BioActive sensor",
      "Body composition analysis",
      "Sleep coaching",
      "Up to 40 hours battery"
    ],
    specifications: {
      "Display": "1.5-inch Super AMOLED",
      "Case Material": "Stainless Steel",
      "Water Resistance": "5ATM + IP68",
      "Battery": "Up to 40 hours",
      "Connectivity": "LTE or Bluetooth",
      "Sensors": "Heart rate, ECG, Blood pressure"
    },
    tags: ["samsung", "watch", "premium"]
  },

  "pixel-watch-2": {
    id: "pixel-watch-2",
    name: "Google Pixel Watch 2",
    description: "Smartwatch with Fitbit health tracking and seamless Google integration.",
    price: 240000,
    compareAtPrice: 270000,
    image: "/images/products/pixel-watch.jpg",
    category: "Smart Watches",
    brand: "Pixel",
    rating: 4.6,
    reviews: 345,
    inStock: true,
    features: [
      "Fitbit health tracking",
      "Advanced heart rate sensor",
      "Stress management",
      "Safety features",
      "Up to 24 hours battery",
      "Fast charging"
    ],
    specifications: {
      "Display": "1.2-inch AMOLED",
      "Case Material": "Aluminum",
      "Water Resistance": "5ATM",
      "Battery": "Up to 24 hours",
      "Connectivity": "GPS + Cellular",
      "Sensors": "Heart rate, ECG, Skin temperature"
    },
    tags: ["pixel", "google", "watch"]
  },

  // ===========================================
  // SOLAR ESSENTIALS (Original)
  // ===========================================
  "solar-fan-pro": {
    id: "solar-fan-pro",
    name: "Solar Fan Pro Max",
    description: "48-hour battery backup, 3 speed settings, USB charging ports. Perfect for Nigerian homes experiencing power outages.",
    price: 65000,
    compareAtPrice: 85000,
    image: "/images/products/solar-fan-pro.jpg",
    category: "Solar Essentials",
    brand: "SolarTech",
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
    description: "High-capacity power bank with solar charging. Charge 6 devices simultaneously.",
    price: 38000,
    compareAtPrice: 48000,
    image: "/images/products/solar-powerbank.jpg",
    category: "Solar Essentials",
    brand: "SolarTech",
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
    description: "Energy-efficient LED bulb with solar panel. 3 lighting modes, remote control.",
    price: 12500,
    compareAtPrice: 18000,
    image: "/images/products/solar-bulb.jpg",
    category: "Solar Essentials",
    brand: "SolarTech",
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

  // ===========================================
  // SKINCARE (Original)
  // ===========================================
  "shea-butter-deluxe": {
    id: "shea-butter-deluxe",
    name: "Deluxe Shea Butter Set",
    description: "100% organic, fair trade, 3-piece collection. Handcrafted with traditional Nigerian recipes.",
    price: 18500,
    compareAtPrice: 25000,
    image: "/images/products/shea-butter.jpg",
    category: "Skincare",
    brand: "Naija Naturals",
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
    description: "Traditional Nigerian black soap set. 4 scents: Original, Lavender, Tea Tree, and Citrus.",
    price: 22500,
    compareAtPrice: 30000,
    image: "/images/products/black-soap.jpg",
    category: "Skincare",
    brand: "Naija Naturals",
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
    description: "Cold-pressed virgin coconut oil. Perfect for hair, skin, and cooking.",
    price: 16500,
    compareAtPrice: 22000,
    image: "/images/products/coconut-oil.jpg",
    category: "Skincare",
    brand: "Naija Naturals",
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

  // ===========================================
  // HOME SOLUTIONS (Original)
  // ===========================================
  "foldable-laundry-rack": {
    id: "foldable-laundry-rack",
    name: "Space Saver Foldable Laundry Rack",
    description: "Heavy-duty foldable laundry rack for small apartments. Holds up to 15kg of clothes.",
    price: 18500,
    compareAtPrice: 25000,
    image: "/images/products/laundry-rack.jpg",
    category: "Home Solutions",
    brand: "SpaceSaver",
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
    description: "Customizable shelving system for small spaces. Mix and match cubes.",
    price: 45000,
    compareAtPrice: 58000,
    image: "/images/products/shelving.jpg",
    category: "Home Solutions",
    brand: "SpaceSaver",
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
    description: "Maximize space with rolling under-bed storage containers. Clear design.",
    price: 22500,
    compareAtPrice: 30000,
    image: "/images/products/storage.jpg",
    category: "Home Solutions",
    brand: "SpaceSaver",
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
  }
};

// ===========================================
// HELPER FUNCTIONS
// ===========================================

// Helper function to get products by category
export function getProductsByCategory(category: string): Product[] {
  return Object.values(products).filter(product => product.category === category);
}

// Helper function to get featured products
export function getFeaturedProducts(count: number = 8): Product[] {
  // Return bestsellers first, then others
  const bestsellers = Object.values(products).filter(p => p.tags.includes("bestseller"));
  const others = Object.values(products).filter(p => !p.tags.includes("bestseller"));
  return [...bestsellers, ...others].slice(0, count);
}

// Helper function to get products by brand
export function getProductsByBrand(brand: string): Product[] {
  return Object.values(products).filter(product => product.brand === brand);
}

// Helper function to search products
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return Object.values(products).filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Categories for navigation - MUST BE AFTER helper functions
export const categories = [
  { name: "Phones", icon: "📱", count: getProductsByCategory("Phones").length },
  { name: "Tablets", icon: "📟", count: getProductsByCategory("Tablets").length },
  { name: "Speakers", icon: "🔊", count: getProductsByCategory("Speakers").length },
  { name: "Earpieces", icon: "🎧", count: getProductsByCategory("Earpieces").length },
  { name: "Smart Watches", icon: "⌚", count: getProductsByCategory("Smart Watches").length },
  { name: "Solar Essentials", icon: "☀️", count: getProductsByCategory("Solar Essentials").length },
  { name: "Skincare", icon: "🧴", count: getProductsByCategory("Skincare").length },
  { name: "Home Solutions", icon: "🏠", count: getProductsByCategory("Home Solutions").length }
];