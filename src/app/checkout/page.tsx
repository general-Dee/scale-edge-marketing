import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { CheckoutSkeleton } from '@/components/skeletons/checkout-skeleton';

const CheckoutForm = dynamic(
  () => import('@/components/checkout/checkout-form').then(mod => mod.CheckoutForm),
  {
    loading: () => <CheckoutSkeleton />,
    ssr: false,
  }
);

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
      <Suspense fallback={<CheckoutSkeleton />}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}