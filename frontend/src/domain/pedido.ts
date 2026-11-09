import type { CrearPedidoBody, ItemPedido } from '../schemas/pedidoSchema'

export function crearCuerpoPedido(
  items: readonly ItemPedido[],
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