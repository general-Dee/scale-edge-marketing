import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">Shipping & Returns</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Shipping & Returns Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              At Voltream, we strive to deliver your orders quickly and ensure you're satisfied with your purchase. Below are our shipping and returns policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Shipping</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Delivery Options</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li><strong>Standard (₦6,000):</strong> 3-5 business days (Lagos & Abuja), 5-7 days to other states.</li>
                <li><strong>Express (₦10,000):</strong> 1-2 business days within Lagos, 2-3 days to other major cities.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400">
                Orders are processed within 24 hours. You will receive a tracking number once your order ships.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Returns & Refunds</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Eligibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Items can be returned within 7 days of delivery if they are defective, damaged, or not as described. To be eligible, the item must be unused and in its original packaging.
              </p>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">How to Return</h3>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                <li>Contact our support team at returns@voltream.africa within 48 hours of delivery.</li>
                <li>Provide your order number and photos of the issue.</li>
                <li>We will issue a return authorization and instructions.</li>
                <li>Pack the item securely and ship it to the provided address.</li>
              </ol>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Refunds</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Once we receive and inspect the return, we'll notify you of the approval or rejection. Approved refunds will be processed to your original payment method within 5-7 business days.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Note: Return shipping costs are the customer's responsibility unless the return is due to our error.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}