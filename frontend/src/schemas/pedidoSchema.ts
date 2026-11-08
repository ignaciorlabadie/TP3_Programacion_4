import { z } from 'zod'

export const itemPedidoSchema = z.object({
  productoId: z.number().int().positive(),
  cantidad: z.number().int().positive(),
})

export const crearPedidoSchema = z.object({
  items: z.array(itemPedidoSchema).min(1),
  mesaId: z.number().int().positive().optional(),
})

export const pedidoSchema = z.object({
  id: z.number().int().positive(),
  items: z.array(itemPedidoSchema),
  estado: z.string(),
  total: z.number().nonnegative(),
  mesaId: z.number().int().positive().optional(),
})

export type ItemPedido = z.infer<typeof itemPedidoSchema>
export type CrearPedidoBody = z.infer<typeof crearPedidoSchema>
export type Pedido = z.infer<typeof pedidoSchema>
