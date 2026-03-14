'use client';

import { useCurrency } from '@/contexts/CurrencyContext';

export function CurrencySelector() {
  const { currency } = useCurrency();
  return (
    <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600">
      {currency.symbol} {currency.code}
    </button>
  );
}