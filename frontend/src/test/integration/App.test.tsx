import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../msw/server'
import App from '../../App'
import { CarritoProvider } from '../../context/CarritoContext'

const urlPedidos = 'http://localhost:5173/api/pedidos'

const pedidoExitoso = {
  id: 42,
  items: [
    { productoId: 19, cantidad: 1 },
    { productoId: 5, cantidad: 2 },
  ],
  estado: 'pendiente',
  total: 17220,
}

function responderPedidoExitoso() {
  server.use(
    http.post(urlPedidos, () => HttpResponse.json(pedidoExitoso, { status: 201 })),
  )
}

function responderPedidoError(mensaje: string, status = 400) {
  server.use(
    http.post(urlPedidos, () => HttpResponse.json({ error: mensaje }, { status })),
  )
}

function responderGetPedido(estado: string, id = 42) {
  server.use(
    http.get(`${urlPedidos}/${id}`, () =>
      HttpResponse.json({ ...pedidoExitoso, id, estado }),
    ),
  )
}

function responderGetPedidoError(id = 42, status = 500) {
  server.use(
    http.get(`${urlPedidos}/${id}`, () =>
      HttpResponse.json({ error: 'Pedido no encontrado' }, { status }),
    ),
  )
}

async function agregarProductoAlCarrito(user: ReturnType<typeof userEvent.setup>) {
  await user.click(await screen.findByRole('radio', { name: 'Expreso' }))
  await user.click(screen.getByRole('radio', { name: 'Mediano' }))
  await user.click(screen.getByRole('radio', { name: 'Colombia' }))
  await user.click(screen.getByRole('button', { name: 'Agregar' }))
}

describe('App', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(async () => {
    user = userEvent.setup()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('renderiza el encabezado de mesa por defecto', () => {
    render(
      <CarritoProvider>
        <App />
      </CarritoProvider>
    )

    expect(screen.getByText('Retirar en la barra')).toBeInTheDocument()
  })

  it('renderiza el componente Carrito vacío por defecto', () => {
    render(
      <CarritoProvider>
        <App />
      </CarritoProvider>
    )

    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument()
  })

  it('confirma el pedido, vacía el carrito y muestra la confirmación', async () => {
    responderPedidoExitoso()

    render(
      <CarritoProvider>
        <App />
      </CarritoProvider>
    )

    await agregarProductoAlCarrito(user)

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('42')).toBeInTheDocument()
    expect(await screen.findByText('pendiente')).toBeInTheDocument()
    expect(await screen.findByText('$17.220')).toBeInTheDocument()
    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument()
  })

  it('muestra el error del backend y no vacía el carrito si falla', async () => {
    responderPedidoError('Producto no encontrado')

    render(
      <CarritoProvider>
        <App />
      </CarritoProvider>
    )

    await agregarProductoAlCarrito(user)

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText(/Producto no encontrado/)).toBeInTheDocument()
    expect(screen.queryByText('El carrito está vacío')).not.toBeInTheDocument()
    expect(screen.queryByText('42')).not.toBeInTheDocument()
  })

  it('actualiza el estado del pedido sin recargar', async () => {
    responderPedidoExitoso()
    responderGetPedido('pendiente')

    render(
      <CarritoProvider>
        <App />
      </CarritoProvider>
    )

    await agregarProductoAlCarrito(user)
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('pendiente')).toBeInTheDocument()

    responderGetPedido('entregado')
    await user.click(screen.getByRole('button', { name: 'Actualizar estado' }))

    expect(await screen.findByText('entregado')).toBeInTheDocument()
    expect(screen.getByText('$17.220')).toBeInTheDocument()
  })

  it('muestra error al actualizar estado y conserva datos anteriores', async () => {
    responderPedidoExitoso()
    responderGetPedidoError()

    render(
      <CarritoProvider>
        <App />
      </CarritoProvider>
    )

    await agregarProductoAlCarrito(user)
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    expect(await screen.findByText('pendiente')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Actualizar estado' }))

    expect(await screen.findByText(/Pedido no encontrado/)).toBeInTheDocument()
    expect(screen.getByText('pendiente')).toBeInTheDocument()
    expect(screen.getByText('$17.220')).toBeInTheDocument()
  })
})