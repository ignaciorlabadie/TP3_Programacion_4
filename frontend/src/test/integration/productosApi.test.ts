import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { ErrorApi, ErrorContrato, getProductos } from '../../api/cliente'
import { productosFixture } from '../msw/fixtures'
import { server } from '../msw/server'

const urlProductos = 'http://localhost:5173/api/productos'

describe('getProductos', () => {
  it('devuelve los productos validados por el contrato', async () => {
    const productos = await getProductos()

    expect(productos).toEqual(productosFixture)
  })

  it('lanza ErrorApi con el mensaje y el status del backend', async () => {
    server.use(
      http.get(urlProductos, () =>
        HttpResponse.json({ error: 'Fallo el servidor' }, { status: 500 }),
      ),
    )

    const error = await getProductos().catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ErrorApi)
    expect(error).toMatchObject({ message: 'Fallo el servidor', status: 500 })
  })

  it('lanza ErrorApi si la API está caída', async () => {
    server.use(http.get(urlProductos, () => HttpResponse.error()))

    const error = await getProductos().catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ErrorApi)
    expect(error).toMatchObject({
      message: 'No se pudo conectar con la API',
      status: 0,
    })
  })

  it('lanza ErrorContrato si la respuesta no cumple el contrato', async () => {
    server.use(
      http.get(urlProductos, () => HttpResponse.json({ productos: [] })),
    )

    await expect(getProductos()).rejects.toBeInstanceOf(ErrorContrato)
  })

  it('lanza ErrorContrato si el JSON es inválido', async () => {
    server.use(
      http.get(
        urlProductos,
        () =>
          new HttpResponse('esto no es json', {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
      ),
    )

    await expect(getProductos()).rejects.toBeInstanceOf(ErrorContrato)
  })
})
