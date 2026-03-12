import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().positive('Price must be positive'),
  compare_at_price: z.coerce.number().positive().optional(),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  in_stock: z.coerce.boolean(),
  stock: z.coerce.number().int().min(0, 'Stock must be a non‑negative integer'), // ← new
  image_urls: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return val.split('\n').map(s => s.trim()).filter(Boolean)
      }
      return val
    },
    z.array(z.string().url('Each image URL must be valid'))
  ),
  features: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return val.split('\n').map(s => s.trim()).filter(Boolean)
      }
      return val
    },
    z.array(z.string())
  ),
  tags: z.preprocess(
    (val) => {
      if (typeof val === 'string') {
        return val.split(',').map(s => s.trim()).filter(Boolean)
      }
      return val
    },
    z.array(z.string())
  ),
})

export const checkoutSchema = z.object({ /* unchanged */ })

export const orderUpdateSchema = z.object({ /* unchanged */ })

export const customerUpdateSchema = z.object({ /* unchanged */ })