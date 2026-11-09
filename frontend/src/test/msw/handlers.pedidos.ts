import { http, HttpResponse } from 'msw'
import { productosFixture } from './fixtures'

const apiUrl = 'http://localhost:5173/api'

type ItemPedidoBody = {
  productoId: number
  cantidad: number
}

type PedidoBody = {
  items?: ItemPedidoBody[]
  mesaId?: number | null
}

const pedidoExitoso = {
  id: 42,
  items: [
    { productoId: 19, cantidad: 1 },
    { productoId: 5, cantidad: 2 },
  ],
  estado: 'pendiente',
  total: 17220,
}

const MESAS = new Set(Array.from({ length: 10 }, (_, i) => i + 1))

function responderError(mensaje: string, status: number) {
  return HttpResponse.json({ error: mensaje }, { status })
}

export const handlersPedidos = [
  http.post(`${apiUrl}/pedidos`, async ({ request }) => {
    const body = (await request.json()) as PedidoBody

    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      return responderError('El pedido debe tener al menos un item', 400)
    }

    const items = body.items

    if (body.mesaId !== undefined && body.mesaId !== null) {
      if (!Number.isSafeInteger(body.mesaId) || body.mesaId <= 0) {
        return responderError('Mesa inválida', 400)
      }
      if (!MESAS.has(body.mesaId)) {
        return responderError('Mesa inexistente', 400)
      }
    }

    for (const item of items as unknown[]) {
      if (typeof item !== 'object' || item === null) {
        return responderError('Item inválido', 400)
      }

      const { productoId, cantidad } = item as ItemPedidoBody

      if (!Number.isInteger(cantidad) || cantidad <= 0) {
        return responderError(
          'La cantidad debe ser un numero entero mayor a 0',
          400,
        )
      }

      if (!productosFixture.some((producto) => producto.id === productoId)) {
        return responderError('Producto no encontrado', 400)
      }
    }

    const total = items.reduce((acumulado, item) => {
      const encontrado = productosFixture.find(
        (producto) => producto.id === item.productoId,
      )
      return acumulado + (encontrado?.precio ?? 0) * item.cantidad
    }, 0)

    return HttpResponse.json(
      {
        ...pedidoExitoso,
        items,
        total,
        ...(body.mesaId !== undefined && body.mesaId !== null
          ? { mesaId: body.mesaId }
          : {}),
      },
      { status: 201 },
    )
  }),

  http.get(`${apiUrl}/pedidos/:id`, ({ params }) => {
    if (Number(params.id) !== 42) {
      return responderError('Pedido no encontrado', 404)
    }

    return HttpResponse.json(pedidoExitoso)
  }),
]
