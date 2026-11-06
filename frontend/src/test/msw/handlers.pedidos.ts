import { http, HttpResponse } from 'msw'

const apiUrl = 'http://localhost:5173/api'

type PedidoBody = {
  items?: unknown
  mesaId?: number
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

export const handlersPedidos = [
  http.post(`${apiUrl}/pedidos`, async ({ request }) => {
    const body = (await request.json()) as PedidoBody

    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      return HttpResponse.json(
        { error: 'El pedido debe tener al menos un item' },
        { status: 400 },
      )
    }

    return HttpResponse.json(pedidoExitoso, { status: 201 })
  }),

  http.get(`${apiUrl}/pedidos/:id`, () => {
    return HttpResponse.json(pedidoExitoso)
  }),
]