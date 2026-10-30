import type { Producto, ProductoCafe } from '../schemas/productoSchema'

export type Bebida = ProductoCafe['tipo']
export type Tamanio = ProductoCafe['tamanio']
export type Origen = ProductoCafe['variedad']['nombre']

export interface SeleccionCafe {
  bebida: Bebida | null
  tamanio: Tamanio | null
  origen: Origen | null
}

export function esCafe(producto: Producto): producto is ProductoCafe {
  return producto.tipo === 'expreso' || producto.tipo === 'filtrado'
}

export function buscarCafe(
  productos: readonly Producto[],
  seleccion: SeleccionCafe,
): ProductoCafe | undefined {
  const { bebida, tamanio, origen } = seleccion

  if (!bebida || !tamanio || !origen) {
    return undefined
  }

  return productos.find(
    (producto): producto is ProductoCafe =>
      esCafe(producto) &&
      producto.tipo === bebida &&
      producto.tamanio === tamanio &&
      producto.variedad.nombre === origen,
  )
}