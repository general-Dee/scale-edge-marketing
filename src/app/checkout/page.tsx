import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { CheckoutSkeleton } from '@/components/skeletons/checkout-skeleton';

const CheckoutContent = dynamic(
  () => import('@/components/pages/checkout-content'),
  { loading: () => <CheckoutSkeleton />, ssr: false }
);

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
        Checkout
      </h1>
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}