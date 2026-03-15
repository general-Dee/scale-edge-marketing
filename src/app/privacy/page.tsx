import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">Privacy Policy</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: March 2025</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Voltream ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you visit our website or make a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>Personal Information:</strong> Name, email, phone, shipping address, payment details (processed securely by Paystack).</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited, referral source.</li>
              <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze site traffic.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <li>To process and fulfill your orders.</li>
              <li>To communicate with you about your order, promotions, and updates.</li>
              <li>To improve our website and customer service.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Sharing</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We do not sell your personal information. We may share data with trusted third parties who assist us in operating our website, conducting business, or servicing you (e.g., Paystack for payments, shipping partners). These parties are bound by confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-400">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@voltream.africa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              For any privacy-related questions, email us at privacy@voltream.africa.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}