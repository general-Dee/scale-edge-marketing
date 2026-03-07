"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
      <motion.div 
        className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div 
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
      />
      <motion.div 
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
    </div>
  );
}