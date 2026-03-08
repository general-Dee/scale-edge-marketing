import { createClient } from '@/lib/supabase/client'

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
export async function getProducts(options?: {
  category?: string
  limit?: number
  offset?: number
}) {
  const supabase = createClient()
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
}

/**
 * Fetch a single product by ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }
  return data as Product | null
}

/**
 * Fetch products by category.
 */
export async function getProductsByCategory(category: string, limit = 20) {
  return getProducts({ category, limit })
}

/**
 * Fetch the most recent products (useful for homepage featured section).
 */
export async function getRecentProducts(limit = 8) {
  const supabase = createClient()
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
}

/**
 * Search products by name or description (simple ILIKE).
 */
export async function searchProducts(query: string, limit = 20) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(limit)

  if (error) {
    console.error('Error searching products:', error)
    return []
  }
  return data as Product[]
}