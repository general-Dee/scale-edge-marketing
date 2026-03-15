import Link from 'next/link';

export function EmptyCart() {
  return (
    <div className="text-center py-12">
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
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Looks like you haven't added anything yet.</p>
      <div className="mt-6">
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}