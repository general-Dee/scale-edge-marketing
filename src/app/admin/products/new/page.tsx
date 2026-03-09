import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProductForm } from '../_components/ProductForm'

export default function NewProductPage() {
  async function createProduct(formData: FormData) {
    'use server'
    const supabase = await createClient()

    const name = formData.get('name') as string
    const brand = formData.get('brand') as string
    const price = parseFloat(formData.get('price') as string)
    const compare_at_price = formData.get('compare_at_price') ? parseFloat(formData.get('compare_at_price') as string) : null
    const category = formData.get('category') as string
    const in_stock = formData.get('stock') === '1'
    const description = formData.get('description') as string
    const image_urls = (formData.get('image_urls') as string).split('\n').map(s => s.trim()).filter(Boolean)
    const features = (formData.get('features') as string).split('\n').map(s => s.trim()).filter(Boolean)
    const specifications = JSON.parse((formData.get('specifications') as string) || '{}')
    const tags = (formData.get('tags') as string).split(',').map(s => s.trim()).filter(Boolean)

    const { error } = await supabase
      .from('products')
      .insert({
        name,
        brand,
        price,
        compare_at_price,
        category,
        in_stock,
        description,
        image_urls,
        features,
        specifications,
        tags,
        rating: 0,
        review_count: 0,
      })

    if (error) {
      console.error('Error creating product:', error)
      // You could redirect to an error page or show a message
    }
    redirect('/admin/products')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">New Product</h1>
      <ProductForm onSubmit={createProduct} />
    </div>
  )
}