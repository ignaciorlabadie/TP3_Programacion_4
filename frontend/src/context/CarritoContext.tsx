import { createContext, useContext, useReducer } from 'react'
import {
  carritoReducer,
  calcularSubtotal,
  type ItemCarrito,
} from '../domain/carrito'
import type { Producto } from '../schemas/productoSchema'

type CarritoContextValue = {
  items: ItemCarrito[]
  agregar: (producto: Producto) => void
  sumar: (productoId: number) => void
  restar: (productoId: number) => void
  quitar: (productoId: number) => void
  vaciar: () => void
  total: number
  estaVacío: boolean
}

const CarritoContext = createContext<CarritoContextValue | undefined>(undefined)

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

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  return contexto
}