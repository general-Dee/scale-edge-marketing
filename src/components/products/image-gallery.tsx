"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  category: string;
}

export function ImageGallery({ images, productName, category }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const getCategoryColor = (categoryName: string) => {
    const colors: Record<string, string> = {
      "Phones": "bg-blue-100",
      "Tablets": "bg-purple-100",
      "Speakers": "bg-indigo-100",
      "Earpieces": "bg-pink-100",
      "Smart Watches": "bg-cyan-100",
      "Solar Essentials": "bg-orange-100",
      "Skincare": "bg-green-100",
      "Home Solutions": "bg-gray-100"
    };
    return colors[categoryName] || "bg-gray-100";
  };

  const getCategoryIcon = (categoryName: string) => {
    const icons: Record<string, string> = {
      "Phones": "📱",
      "Tablets": "📟",
      "Speakers": "🔊",
      "Earpieces": "🎧",
      "Smart Watches": "⌚",
      "Solar Essentials": "☀️",
      "Skincare": "🧴",
      "Home Solutions": "🏠"
    };
    return icons[categoryName] || "📦";
  };

  const handlePrevious = () => {
    setDirection(-1);
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={selectedImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            {images[selectedImage] ? (
              <Image
                src={images[selectedImage]}
                alt={`${productName} - View ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={selectedImage === 0}
              />
            ) : (
              <div className={`w-full h-full ${getCategoryColor(category)} flex items-center justify-center`}>
                <span className="text-8xl">{getCategoryIcon(category)}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white dark:hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white dark:hover:bg-gray-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > selectedImage ? 1 : -1);
                setSelectedImage(index);
              }}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-orange-600 scale-105 shadow-lg"
                  : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {image ? (
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className={`w-full h-full ${getCategoryColor(category)} flex items-center justify-center`}>
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}