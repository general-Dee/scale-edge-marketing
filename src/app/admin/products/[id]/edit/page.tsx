import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { ProductForm } from '../../_components/ProductForm'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) {
    notFound()
  }

  async function updateProduct(formData: FormData) {
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
      .update({
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
      })
      .eq('id', params.id)

    if (error) {
      console.error('Error updating product:', error)
    }
    redirect('/admin/products')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Product</h1>
      <ProductForm initialData={product} onSubmit={updateProduct} />
    </div>
  )
}