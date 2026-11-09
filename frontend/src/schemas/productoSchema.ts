import { z } from 'zod'

export const variedadSchema = z.object({
  nombre: z.string().min(1),
  descripcion: z.string().min(1),
})

const productoBaseSchema = z.object({
  id: z.number().int().positive(),
  nombre: z.string().min(1),
  precio: z.number().nonnegative(),
})

const cafeBaseSchema = productoBaseSchema.extend({
  tamanio: z.enum(['Pocillo', 'Mediano', 'Taza grande']),
  gramosCafe: z.number().positive(),
  variedad: variedadSchema,
})

export const productoExpresoSchema = cafeBaseSchema.extend({
  tipo: z.literal('expreso'),
})

export const productoFiltradoSchema = cafeBaseSchema.extend({
  tipo: z.literal('filtrado'),
})

export const productoPasteleriaSchema = productoBaseSchema.extend({
  tipo: z.literal('pasteleria'),
})

export const productoSchema = z.discriminatedUnion('tipo', [
  productoExpresoSchema,
  productoFiltradoSchema,
  productoPasteleriaSchema,
])

export type Producto = z.infer<typeof productoSchema>
export type ProductoExpreso = z.infer<typeof productoExpresoSchema>
export type ProductoFiltrado = z.infer<typeof productoFiltradoSchema>
export type ProductoPasteleria = z.infer<typeof productoPasteleriaSchema>
export type ProductoCafe = ProductoExpreso | ProductoFiltrado