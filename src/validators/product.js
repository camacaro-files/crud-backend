import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').trim(),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser mayor a 0'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo').optional()
})

export const updateProductSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').trim(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional()
})