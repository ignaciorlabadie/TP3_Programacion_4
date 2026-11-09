import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { MenuProductos } from '../../components/MenuProductos'
import type { Producto } from '../../schemas/productoSchema'
import { server } from '../msw/server'

const urlProductos = 'http://localhost:5173/api/productos'

function renderMenu(
  onAgregar: (producto: Producto) => void = () => undefined,
) {
  return render(<MenuProductos onAgregar={onAgregar} />)
}

function responderError(mensaje: string, status = 500) {
  server.use(
    http.get(urlProductos, () => HttpResponse.json({ error: mensaje }, { status })),
  )
}

describe('MenuProductos', () => {
  it('muestra un indicador mientras carga', () => {
    renderMenu()

    expect(screen.getByRole('status')).toHaveTextContent('Cargando menú')
  })

  it('muestra café y pastelería cuando la API responde', async () => {
    renderMenu()

    expect(
      await screen.findByRole('heading', { name: 'Café' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Pastelería' }),
    ).toBeInTheDocument()
  })

  it('muestra el mensaje del backend y permite reintentar', async () => {
    responderError('Fallo el servidor')
    renderMenu()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Fallo el servidor',
    )
    expect(
      screen.getByRole('button', { name: 'Reintentar' }),
    ).toBeInTheDocument()
  })

  it('muestra un mensaje claro si la API está caída', async () => {
    server.use(http.get(urlProductos, () => HttpResponse.error()))
    renderMenu()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'No se pudo conectar con la API',
    )
    expect(
      screen.getByRole('button', { name: 'Reintentar' }),
    ).toBeInTheDocument()
  })

  it('muestra un error si la respuesta no cumple el contrato', async () => {
    server.use(
      http.get(urlProductos, () => HttpResponse.json({ productos: [] })),
    )
    renderMenu()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'La respuesta de la API no cumple el contrato',
    )
  })

  it('recarga el menú al reintentar después de un error', async () => {
    const user = userEvent.setup()
    responderError('Fallo el servidor')
    renderMenu()

    await screen.findByRole('alert')

    server.resetHandlers()
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))

    expect(
      await screen.findByRole('heading', { name: 'Café' }),
    ).toBeInTheDocument()
  })

  it('entrega el café elegido a onAgregar', async () => {
    const user = userEvent.setup()
    const onAgregar = vi.fn()
    renderMenu(onAgregar)

    await user.click(await screen.findByRole('radio', { name: 'Expreso' }))
    await user.click(screen.getByRole('radio', { name: 'Mediano' }))
    await user.click(screen.getByRole('radio', { name: 'Colombia' }))
    await user.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(
      expect.objectContaining({ id: 5, tipo: 'expreso', precio: 7360 }),
    )
  })

  it('entrega la pastelería elegida a onAgregar', async () => {
    const user = userEvent.setup()
    const onAgregar = vi.fn()
    renderMenu(onAgregar)

    await user.click(
      await screen.findByRole('button', {
        name: 'Agregar Muffin de chocolate',
      }),
    )

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(
      expect.objectContaining({ id: 19, tipo: 'pasteleria', precio: 2500 }),
    )
  })
})
