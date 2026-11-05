import { describe, it, expect } from 'vitest'
import {
  carritoReducer,
  calcularSubtotal,
  type ItemCarrito,
  type AccionCarrito,
} from '../../domain/carrito'

const estadoInicial: ItemCarrito[] = []

const muffin: ItemCarrito = {
  productoId: 19,
  nombre: 'Muffin de chocolate',
  precio: 2500,
  cantidad: 1,
}

const expreso: ItemCarrito = {
  productoId: 5,
  nombre: 'Expreso Mediano Colombia',
  precio: 7360,
  cantidad: 1,
}

describe('carritoReducer', () => {
  it('devuelve un carrito vacío por defecto', () => {
    const resultado = carritoReducer(estadoInicial, {
      type: 'QUITAR',
      payload: { productoId: 999 },
    })
    expect(resultado).toEqual([])
  })

  it('agrega un producto nuevo con cantidad 1', () => {
    const accion: AccionCarrito = {
      type: 'AGREGAR',
      payload: { productoId: 19, nombre: 'Muffin de chocolate', precio: 2500 },
    }
    const resultado = carritoReducer(estadoInicial, accion)
    expect(resultado).toEqual([muffin])
  })

  it('agrega el mismo producto dos veces y aumenta la cantidad', () => {
    const accion: AccionCarrito = {
      type: 'AGREGAR',
      payload: { productoId: 19, nombre: 'Muffin de chocolate', precio: 2500 },
    }
    const conUno = carritoReducer(estadoInicial, accion)
    const conDos = carritoReducer(conUno, accion)
    expect(conDos).toEqual([{ ...muffin, cantidad: 2 }])
  })

  it('no muta el estado original', () => {
    const accion: AccionCarrito = {
      type: 'AGREGAR',
      payload: { productoId: 19, nombre: 'Muffin de chocolate', precio: 2500 },
    }
    const antes = [...estadoInicial]
    carritoReducer(estadoInicial, accion)
    expect(estadoInicial).toEqual(antes)
  })

  it('sumar aumenta la cantidad de un producto existente', () => {
    const accion: AccionCarrito = { type: 'SUMAR', payload: { productoId: 19 } }
    const resultado = carritoReducer([muffin], accion)
    expect(resultado).toEqual([{ ...muffin, cantidad: 2 }])
  })

  it('restar disminuye la cantidad de un producto existente', () => {
    const conDos: ItemCarrito = { ...muffin, cantidad: 2 }
    const accion: AccionCarrito = { type: 'RESTAR', payload: { productoId: 19 } }
    const resultado = carritoReducer([conDos], accion)
    expect(resultado).toEqual([muffin])
  })

  it('restar cuando la cantidad es 1 elimina el producto', () => {
    const accion: AccionCarrito = { type: 'RESTAR', payload: { productoId: 19 } }
    const resultado = carritoReducer([muffin], accion)
    expect(resultado).toEqual([])
  })

  it('quitar elimina un producto sin importar la cantidad', () => {
    const conDos: ItemCarrito = { ...muffin, cantidad: 3 }
    const accion: AccionCarrito = { type: 'QUITAR', payload: { productoId: 19 } }
    const resultado = carritoReducer([conDos], accion)
    expect(resultado).toEqual([])
  })

  it('ignora acciones desconocidas', () => {
    const accion = { type: 'OTRA' } as unknown as AccionCarrito
    const resultado = carritoReducer([muffin], accion)
    expect(resultado).toEqual([muffin])
  })
})

describe('calcularSubtotal', () => {
  it('devuelve 0 para un carrito vacío', () => {
    expect(calcularSubtotal([])).toBe(0)
  })

  it('calcula el subtotal de un solo producto', () => {
    expect(calcularSubtotal([muffin])).toBe(2500)
  })

  it('calcula el subtotal de varios productos con cantidades', () => {
    const carrito: ItemCarrito[] = [
      { ...muffin, cantidad: 2 },
      { ...expreso, cantidad: 1 },
    ]
    expect(calcularSubtotal(carrito)).toBe(2 * 2500 + 7360)
  })
})

//vaciar carrito
it('vacía un carrito con varios items', () => {
  const carrito: ItemCarrito[] = [muffin, { ...expreso, cantidad: 2 }];
  const resultado = carritoReducer(carrito, { type: 'VACIAR' });
  expect(resultado).toEqual([]);
});

it('no muta el estado original al vaciar', () => {
  const antes = [...[muffin, expreso]];
  carritoReducer([muffin, expreso], { type: 'VACIAR' });
  expect([muffin, expreso]).toEqual(antes);
});

it('vaciar sobre carrito vacío devuelve vacío', () => {
  expect(carritoReducer([], { type: 'VACIAR' })).toEqual([]);
});