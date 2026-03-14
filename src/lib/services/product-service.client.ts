import { createClient } from '@/lib/supabase/client';
import { Product } from '@/lib/products';

export async function getProducts(options?: { category?: string; limit?: number; offset?: number }): Promise<Product[]> {
  const supabase = createClient();
  let query = supabase.from('products').select('*');

  if (options?.category) {
    query = query.eq('category', options.category);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data as Product[];
}

export async function getProductsByCategory(category: string, limit?: number): Promise<Product[]> {
  const supabase = createClient();
  let query = supabase.from('products').select('*').eq('category', category);
  if (limit) query = query.limit(limit);
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  return data as Product[];
}

export async function getRecentProducts(limit = 8): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent products:', error);
    return [];
  }
  return data as Product[];
}