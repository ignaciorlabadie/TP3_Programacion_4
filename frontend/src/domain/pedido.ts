import type { CrearPedidoBody } from '../api/cliente'
import type { ItemCarrito } from './carrito'

export function crearCuerpoPedido(
  items: readonly ItemCarrito[],
  mesa: number | null,
): CrearPedidoBody {
  return {
    items: items.map((item) => ({
      productoId: item.productoId,
      cantidad: item.cantidad,
    })),
    ...(mesa !== null ? { mesaId: mesa } : {}),
  }
}
