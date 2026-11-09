import { describe, expect, it } from 'vitest'
import { crearCuerpoPedido } from '../../domain/pedido'
import type { ItemCarrito } from '../../domain/carrito'

const expreso: ItemCarrito = {
  productoId: 5,
  nombre: 'Expreso Mediano Colombia',
  precio: 7360,
  cantidad: 2,
}

const muffin: ItemCarrito = {
  productoId: 19,
  nombre: 'Muffin de chocolate',
  precio: 2500,
  cantidad: 1,
}

describe('crearCuerpoPedido', () => {
  it('incluye mesaId y mapea los items cuando hay mesa', () => {
    expect(crearCuerpoPedido([expreso, muffin], 4)).toEqual({
      mesaId: 4,
      items: [
        { productoId: 5, cantidad: 2 },
        { productoId: 19, cantidad: 1 },
      ],
    })
  })

  it('omite mesaId cuando el pedido es para retirar', () => {
    const cuerpo = crearCuerpoPedido([expreso], null)

    expect(cuerpo).toEqual({
      items: [{ productoId: 5, cantidad: 2 }],
    })
    expect(cuerpo).not.toHaveProperty('mesaId')
  })

  it('no incluye datos del carrito que la API no necesita', () => {
    const cuerpo = crearCuerpoPedido([expreso], 4)

    expect(cuerpo.items[0]).toEqual({ productoId: 5, cantidad: 2 })
  })
})
