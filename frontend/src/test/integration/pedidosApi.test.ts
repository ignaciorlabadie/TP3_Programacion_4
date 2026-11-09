import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { ErrorApi, ErrorContrato, crearPedido, getPedido } from '../../api/cliente'
import { pedidoFixture } from '../msw/fixtures'
import { server } from '../msw/server'

const urlPedidos = 'http://localhost:5173/api/pedidos'

const items = [
  { productoId: 5, cantidad: 2 },
  { productoId: 19, cantidad: 1 },
]

describe('crearPedido', () => {
  it('hace POST /pedidos con el JSON correcto', async () => {
    let cuerpo: unknown

    server.use(
      http.post(urlPedidos, async ({ request }) => {
        cuerpo = await request.json()
        return HttpResponse.json(pedidoFixture, { status: 201 })
      }),
    )

    const pedido = await crearPedido(4, items)

    expect(cuerpo).toEqual({ mesaId: 4, items })
    expect(pedido).toEqual(pedidoFixture)
  })

  it('omite mesaId cuando el pedido es para retirar', async () => {
    let cuerpo: unknown

    server.use(
      http.post(urlPedidos, async ({ request }) => {
        cuerpo = await request.json()
        return HttpResponse.json(pedidoFixture, { status: 201 })
      }),
    )

    await crearPedido(null, items)

    expect(cuerpo).toEqual({ items })
  })

  it('lanza ErrorApi con el mensaje del backend ante un 4xx', async () => {
    server.use(
      http.post(urlPedidos, () =>
        HttpResponse.json({ error: 'Mesa inexistente' }, { status: 400 }),
      ),
    )

    const error = await crearPedido(999, items).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ErrorApi)
    expect(error).toMatchObject({
      message: 'Mesa inexistente',
      status: 400,
    })
  })

  it('lanza ErrorApi si la API está caída', async () => {
    server.use(http.post(urlPedidos, () => HttpResponse.error()))

    const error = await crearPedido(4, items).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ErrorApi)
    expect(error).toMatchObject({
      message: 'No se pudo conectar con la API',
      status: 0,
    })
  })

  it('lanza ErrorContrato si la respuesta no cumple el contrato', async () => {
    server.use(
      http.post(urlPedidos, () =>
        HttpResponse.json({ id: 'no-es-un-numero' }, { status: 201 }),
      ),
    )

    await expect(crearPedido(4, items)).rejects.toBeInstanceOf(ErrorContrato)
  })
})

describe('getPedido', () => {
  it('hace GET /pedidos/:id y valida el contrato', async () => {
    const pedido = await getPedido(42)

    expect(pedido).toEqual(pedidoFixture)
  })

  it('lanza ErrorApi con el mensaje del backend ante un 4xx', async () => {
    server.use(
      http.get(`${urlPedidos}/999`, () =>
        HttpResponse.json({ error: 'Pedido no encontrado' }, { status: 404 }),
      ),
    )

    const error = await getPedido(999).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ErrorApi)
    expect(error).toMatchObject({
      message: 'Pedido no encontrado',
      status: 404,
    })
  })

  it('lanza ErrorApi si la API está caída', async () => {
    server.use(http.get(`${urlPedidos}/42`, () => HttpResponse.error()))

    const error = await getPedido(42).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ErrorApi)
    expect(error).toMatchObject({
      message: 'No se pudo conectar con la API',
      status: 0,
    })
  })

  it('lanza ErrorContrato si la respuesta no cumple el contrato', async () => {
    server.use(
      http.get(`${urlPedidos}/42`, () =>
        HttpResponse.json({ id: 42, estado: 'pendiente' }),
      ),
    )

    await expect(getPedido(42)).rejects.toBeInstanceOf(ErrorContrato)
  })
})