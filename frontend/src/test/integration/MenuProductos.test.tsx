import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { MenuProductos } from '../../components/MenuProductos'
import { server } from '../msw/server'

const urlProductos = 'http://localhost:5173/api/productos'

function renderMenu() {
  return render(<MenuProductos onAgregar={() => undefined} />)
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
})
