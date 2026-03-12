import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface InventoryItem {
  id: string
  name: string
  stock: number
  threshold?: number
}

export const getLowStockProducts = cache(async (threshold: number = 5): Promise<InventoryItem[]> => {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('id, name, stock')
    .lt('stock', threshold)
    .order('stock', { ascending: true })

  if (error) {
    console.error('Error fetching low stock products:', error)
    return []
  }

  return (data || []).map(item => ({
    ...item,
    threshold,
  }))
})

export const getProductStock = cache(async (productId: string): Promise<number | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('stock')
    .eq('id', productId)
    .single()

  if (error) {
    console.error('Error fetching product stock:', error)
    return null
  }

  return data?.stock ?? null
})