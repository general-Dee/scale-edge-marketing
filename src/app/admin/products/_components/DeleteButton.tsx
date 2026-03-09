'use client';

import { useRouter } from 'next/navigation';

export function DeleteButton({ productId }: { productId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/admin/products/${productId}/delete`, {
        method: 'POST',
      });
      router.refresh(); // Refresh the page to update the list
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
    >
      Delete
    </button>
  );
}