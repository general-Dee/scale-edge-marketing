import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price?: number
  image_urls: string[]
  category: string
  brand: string
  rating: number
  review_count: number
  in_stock: boolean
  features: string[]
  specifications: Record<string, string>
  tags: string[]
}

/**
 * Fetch all products, optionally with filters.
 */
export const getProducts = cache(async (options?: {
  category?: string
  limit?: number
  offset?: number
}) => {
  const supabase = await createClient()
  let query = supabase.from('products').select('*')

  if (options?.category) {
    query = query.eq('category', options.category)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }
  return data as Product[]
})

/**
 * Fetch a single product by ID (UUID).
 */
export const getProductById = cache(async (id: string): Promise<Product | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product by id:', error)
    return null
  }
  return data as Product | null
})

/**
 * Fetch a single product by slug (URL-friendly name).
 */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
  return data as Product | null
})

/**
 * Fetch products by category.
 */
export const getProductsByCategory = cache(async (category: string, limit = 20) => {
  return getProducts({ category, limit })
})

/**
 * Fetch the most recent products.
 */
export const getRecentProducts = cache(async (limit = 8) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent products:', error)
    return []
  }
  return data as Product[]
})