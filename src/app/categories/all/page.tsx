import { getProducts } from '@/lib/services/product-service';

export default async function AllProductsPage() {
  const products = await getProducts(); // no limit = all
  // ... render
}