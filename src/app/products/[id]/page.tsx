import { getProductById } from '@/lib/services/product-service';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image_urls?.[0] ? [product.image_urls[0]] : [],
    },
  };
}

// ... rest of page component ...