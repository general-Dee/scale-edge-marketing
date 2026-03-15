import Link from 'next/link';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide your shipping details and complete payment via Paystack."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major Nigerian cards, bank transfers, and USSD via Paystack. You can also pay with mobile money where available."
  },
  {
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days within Lagos and Abuja, and 5-7 days to other states. Express delivery (1-2 business days) is available at checkout."
  },
  {
    question: "Do you ship outside Nigeria?",
    answer: "Currently we only ship within Nigeria. We plan to expand to other African countries soon."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return window for defective or damaged items. Please contact our support team within 48 hours of delivery."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking link via SMS and email. You can also check order status in your account dashboard."
  },
  {
    question: "Are your products genuine?",
    answer: "Yes! We source directly from authorized distributors and official brand partners. All products come with manufacturer warranty where applicable."
  },
  {
    question: "Do you offer installation for solar products?",
    answer: "Yes, professional installation is available for solar systems at an additional cost. Contact us for a quote."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">Frequently Asked Questions</span>
        </nav>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}