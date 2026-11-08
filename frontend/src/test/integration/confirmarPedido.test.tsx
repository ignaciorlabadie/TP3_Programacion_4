import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../msw/server'
import App from '../../App'
import { CarritoProvider } from '../../context/CarritoContext'

const urlPedidos = 'http://localhost:5173/api/pedidos'

const pedidoExitoso = {
  id: 42,
  mesaId: 4,
  items: [
    { productoId: 5, cantidad: 2 },
    { productoId: 19, cantidad: 1 },
  ],
  estado: 'pendiente',
  total: 17220,
}

type Usuario = ReturnType<typeof userEvent.setup>

function renderApp() {
  return render(
    <CarritoProvider>
      <App />
    </CarritoProvider>
  )
}

async function agregarCafe(user: Usuario) {
  await user.click(await screen.findByRole('radio', { name: 'Expreso' }))
  await user.click(screen.getByRole('radio', { name: 'Mediano' }))
  await user.click(screen.getByRole('radio', { name: 'Colombia' }))
  await user.click(screen.getByRole('button', { name: 'Agregar', exact: true }))
}

async function agregarMuffin(user: Usuario) {
  await user.click(
    screen.getByRole('button', { name: 'Agregar Muffin de chocolate' })
  )
}

function capturarBodyExitoso() {
  const captura: { cuerpo?: unknown } = {}

  server.use(
    http.post(urlPedidos, async ({ request }) => {
      captura.cuerpo = await request.json()
      return HttpResponse.json(pedidoExitoso, { status: 201 })
    })
  )

  return captura
}

describe('Confirmar pedido', () => {
  let user: Usuario

  beforeEach(() => {
    user = userEvent.setup()
  })

  afterEach(() => {
    server.resetHandlers()
    window.history.replaceState({}, '', '/')
  })

  it('envía la mesa y los items al confirmar', async () => {
    window.history.replaceState({}, '', '/?mesa=4')
    const captura = capturarBodyExitoso()

    renderApp()
    await agregarCafe(user)
    await agregarCafe(user)
    await agregarMuffin(user)

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('42')).toBeInTheDocument()
    expect(captura.cuerpo).toEqual({
      mesaId: 4,
      items: [
        { productoId: 5, cantidad: 2 },
        { productoId: 19, cantidad: 1 },
      ],
    })
  })

  it('omite mesaId cuando el pedido es para retirar', async () => {
    const captura = capturarBodyExitoso()

    renderApp()
    await agregarCafe(user)
    await agregarMuffin(user)

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('42')).toBeInTheDocument()
    expect(captura.cuerpo).toEqual({
      items: [
        { productoId: 5, cantidad: 1 },
        { productoId: 19, cantidad: 1 },
      ],
    })
    expect(captura.cuerpo).not.toHaveProperty('mesaId')
  })

  it('muestra el error de la API y conserva el carrito', async () => {
    server.use(
      http.post(urlPedidos, () =>
        HttpResponse.json({ error: 'Mesa inexistente' }, { status: 400 })
      )
    )

    renderApp()
    await agregarCafe(user)

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('Mesa inexistente')).toBeInTheDocument()
    expect(screen.queryByText('El carrito está vacío')).not.toBeInTheDocument()
  })

  it('muestra un error de contrato y conserva el carrito', async () => {
    server.use(
      http.post(urlPedidos, () =>
        HttpResponse.json({ id: 'no-es-un-numero' }, { status: 201 })
      )
    )

    renderApp()
    await agregarCafe(user)

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(
      await screen.findByText('La respuesta de la API no cumple el contrato')
    ).toBeInTheDocument()
    expect(screen.queryByText('El carrito está vacío')).not.toBeInTheDocument()
  })
})
