import { describe, expect, it } from 'vitest'
import { crearPedidoSchema, pedidoSchema } from '../../schemas/pedidoSchema'

const items = [
  { productoId: 5, cantidad: 2 },
  { productoId: 19, cantidad: 1 },
]

const pedidoValido = {
  id: 42,
  mesaId: 4,
  items,
  estado: 'pendiente',
  total: 17220,
}

describe('crearPedidoSchema', () => {
  it('acepta un pedido con mesa e items', () => {
    expect(crearPedidoSchema.safeParse({ mesaId: 4, items }).success).toBe(true)
  })

  it('acepta un pedido sin mesa', () => {
    expect(crearPedidoSchema.safeParse({ items }).success).toBe(true)
  })

  it('rechaza un pedido sin items', () => {
    expect(crearPedidoSchema.safeParse({ items: [] }).success).toBe(false)
  })

  it.each([0, -1, 1.5])('rechaza la cantidad inválida %s', (cantidad) => {
    const invalido = { items: [{ productoId: 5, cantidad }] }

    expect(crearPedidoSchema.safeParse(invalido).success).toBe(false)
  })
})

describe('pedidoSchema', () => {
  it('acepta un pedido con estado, items, total y mesa', () => {
    expect(pedidoSchema.safeParse(pedidoValido).success).toBe(true)
  })

  it('acepta un pedido sin mesa', () => {
    const sinMesa = { ...pedidoValido, mesaId: undefined }

    expect(pedidoSchema.safeParse(sinMesa).success).toBe(true)
  })

  it('rechaza un total negativo', () => {
    const invalido = { ...pedidoValido, total: -1 }

    expect(pedidoSchema.safeParse(invalido).success).toBe(false)
  })

  it('rechaza un id que no es entero', () => {
    const invalido = { ...pedidoValido, id: 1.5 }

    expect(pedidoSchema.safeParse(invalido).success).toBe(false)
  })

  it('rechaza un pedido al que le falta el estado', () => {
    const sinEstado = {
      id: pedidoValido.id,
      mesaId: pedidoValido.mesaId,
      items: pedidoValido.items,
      total: pedidoValido.total,
    }

    expect(pedidoSchema.safeParse(sinEstado).success).toBe(false)
  })
})
