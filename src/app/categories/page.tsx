"use client";

export const dynamic = 'force-dynamic';

import Link from "next/link";
import { categories, getCategoryGradient } from "@/lib/products";
import { PageTemplate } from "@/components/page-template";

export default function CategoriesPage() {
  return (
    <PageTemplate>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Browse our curated collection of premium gadgets and solar solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 block">
                <div className={`h-48 bg-gradient-to-br ${getCategoryGradient(category.name)} flex items-center justify-center`}>
                  <span className="text-7xl transform group-hover:scale-110 transition-transform">{category.icon}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Browse products</p>
                  <div className="flex items-center text-orange-600 font-semibold">
                    Shop Now
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}