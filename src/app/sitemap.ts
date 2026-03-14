import { getProducts } from '@/lib/services/product-service';
import { categories, Product } from '@/lib/products';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const products = await getProducts();

  const productUrls = (products as Product[]).map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.created_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/account`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    ...categoryUrls,
    ...productUrls,
  ];
}