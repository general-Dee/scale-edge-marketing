import Link from "next/link";

// Force static generation
export const dynamic = 'force-static';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The checkout page is loading. Please enable JavaScript.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}