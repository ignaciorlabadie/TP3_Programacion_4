import { createContext, useContext } from 'react'
import type { ItemCarrito } from '../domain/carrito'
import type { Producto } from '../schemas/productoSchema'

export type CarritoContextValue = {
  items: ItemCarrito[]
  agregar: (producto: Producto) => void
  sumar: (productoId: number) => void
  restar: (productoId: number) => void
  quitar: (productoId: number) => void
  vaciar: () => void
  total: number
  estaVacío: boolean
}

export const CarritoContext = createContext<
  CarritoContextValue | undefined
>(undefined)

export function useCarrito() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider')
  }
  return contexto
}
