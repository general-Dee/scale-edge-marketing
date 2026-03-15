import Link from 'next/link';

export function EmptySearch({ query }: { query: string }) {
  return (
    <div className="text-center py-16">
      <svg
        className="mx-auto h-24 w-24 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        We couldn't find any products matching "{query}".
      </p>
      <div className="mt-6">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          Browse Categories
        </Link>
      </div>
    </div>
  );
}