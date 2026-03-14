import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { ProductGridSkeleton } from '@/components/skeletons/product-grid-skeleton';
import { getCategoryIcon } from '@/lib/products';

export const dynamic = 'force-dynamic';

async function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Enter a search term to find products.</p>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Search error:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600">An error occurred. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        {products.length} product{products.length !== 1 ? 's' : ''} found
      </p>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}