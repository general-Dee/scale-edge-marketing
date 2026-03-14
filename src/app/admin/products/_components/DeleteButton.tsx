'use client'

import { deleteProduct } from '@/lib/actions/product-actions'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  productId: string
}

export function DeleteButton({ productId }: DeleteButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId)
        router.refresh()
      } catch (error) {
        alert('Failed to delete product')
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  )
}