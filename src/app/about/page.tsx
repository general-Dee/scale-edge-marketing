import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-600">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white">About Us</span>
        </nav>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About Voltream
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Welcome to Voltream – your premier destination for cutting-edge gadgets and sustainable solar solutions. 
              We are passionate about empowering modern African households with technology that enhances everyday life 
              while embracing clean energy.
            </p>
            <p>
              Founded in 2023, Voltream began with a simple mission: to bridge the gap between global innovation and 
              local accessibility. We partner with trusted brands like Apple, Samsung, Sony, Google, and Sun King to 
              bring you the best products at competitive prices.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Innovation:</strong> We curate the latest tech to keep you ahead.</li>
              <li><strong>Sustainability:</strong> Solar solutions that reduce carbon footprint.</li>
              <li><strong>Trust:</strong> Secure payments, genuine products, and reliable delivery.</li>
              <li><strong>Community:</strong> We are proudly African and here to serve you.</li>
            </ul>
            <p className="mt-6">
              Thank you for choosing Voltream. Together, let’s power the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}