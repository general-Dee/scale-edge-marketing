import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">Terms of Service</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: March 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400">
              By accessing or using the Voltream website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Use of Our Service</h2>
            <p className="text-gray-600 dark:text-gray-400">
              You may use our service only for lawful purposes and in accordance with these terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Violate any applicable laws or regulations.</li>
              <li>Impersonate any person or entity.</li>
              <li>Interfere with the proper functioning of the website.</li>
              <li>Attempt to gain unauthorized access to our systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Products and Pricing</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We strive to display accurate product information and pricing. However, errors may occur. We reserve the right to correct any errors and change or update information at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Orders and Payment</h2>
            <p className="text-gray-600 dark:text-gray-400">
              All orders are subject to acceptance and availability. We may refuse or cancel any order for reasons including but not limited to product availability, errors in pricing, or suspected fraud. Payment is processed securely via Paystack.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Shipping and Returns</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Shipping and returns are governed by our Shipping & Returns Policy, which is incorporated into these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400">
              To the fullest extent permitted by law, Voltream shall not be liable for any indirect, incidental, or consequential damages arising out of your use of our products or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may update these terms from time to time. The updated version will be posted here with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact</h2>
            <p className="text-gray-600 dark:text-gray-400">
              For questions about these terms, contact us at legal@voltream.africa.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}