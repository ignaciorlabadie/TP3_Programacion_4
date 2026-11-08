import { useReducer } from 'react'
import {
  carritoReducer,
  calcularSubtotal,
  type ItemCarrito,
} from '../domain/carrito'
import { CarritoContext } from './useCarrito'
import type { CarritoContextValue } from './useCarrito'
import type { Producto } from '../schemas/productoSchema'

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(carritoReducer, [] as ItemCarrito[])

  const agregar = (producto: Producto) => {
    dispatch({
      type: 'AGREGAR',
      payload: {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
      },
    })
  }

  const sumar = (productoId: number) => {
    dispatch({ type: 'SUMAR', payload: { productoId } })
  }

  const restar = (productoId: number) => {
    dispatch({ type: 'RESTAR', payload: { productoId } })
  }

  const quitar = (productoId: number) => {
    dispatch({ type: 'QUITAR', payload: { productoId } })
  }

  const vaciar = () => {
    dispatch({ type: 'VACIAR' })
  }

  const total = calcularSubtotal(items)
  const estaVacío = items.length === 0

  const value: CarritoContextValue = {
    items,
    agregar,
    sumar,
    restar,
    quitar,
    vaciar,
    total,
    estaVacío,
  }

  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}
