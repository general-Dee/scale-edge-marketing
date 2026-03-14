import { createClient } from '@/lib/supabase/server';
import { cache } from 'react';
import { Product } from '@/lib/products';

export const getProducts = cache(async (options?: { category?: string; limit?: number; offset?: number }) => {
  const supabase = await createClient();
  let query = supabase.from('products').select('*');

  if (options?.category) query = query.eq('category', options.category);
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, options.offset + (options.limit || 10) - 1);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data as Product[];
});

export const getProductsByCategory = cache(async (category: string, limit?: number) => {
  const supabase = await createClient();
  let query = supabase.from('products').select('*').eq('category', category);
  if (limit) query = query.limit(limit);
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
  return data as Product[];
});

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
  return data as Product | null;
});

export const getRecentProducts = cache(async (limit = 8) => {
  const supabase = await createClient();
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
});