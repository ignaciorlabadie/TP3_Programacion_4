import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from '../msw/server'
import { ConfirmacionPedido } from '../../components/ConfirmacionPedido'
import { pedidoFixture } from '../msw/fixtures'

const urlPedido = 'http://localhost:5173/api/pedidos/42'

function responderGetPedido(estado: string) {
  server.use(
    http.get(urlPedido, () =>
      HttpResponse.json({ ...pedidoFixture, estado }),
    ),
  )
}

function responderGetPedidoError() {
  server.use(
    http.get(urlPedido, () =>
      HttpResponse.json({ error: 'Pedido no encontrado' }, { status: 500 }),
    ),
  )
}

describe('ConfirmacionPedido', () => {
  beforeEach(() => {
    server.resetHandlers()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('muestra número, estado y total del pedido', () => {
    render(<ConfirmacionPedido pedido={pedidoFixture} />)

    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('pendiente')).toBeInTheDocument()
    expect(screen.getByText('$17.220')).toBeInTheDocument()
  })

  it('muestra el pedido nuevo si se confirma otro pedido', () => {
    const { rerender } = render(<ConfirmacionPedido pedido={pedidoFixture} />)

    expect(screen.getByText('42')).toBeInTheDocument()

    const segundoPedido = {
      ...pedidoFixture,
      id: 43,
      estado: 'en preparación',
      total: 20000,
    }

    rerender(<ConfirmacionPedido pedido={segundoPedido} />)

    expect(screen.getByText('43')).toBeInTheDocument()
    expect(screen.getByText('en preparación')).toBeInTheDocument()
    expect(screen.getByText('$20.000')).toBeInTheDocument()
    expect(screen.queryByText('42')).not.toBeInTheDocument()
  })

  it('actualiza el estado sin recargar la página', async () => {
    const user = userEvent.setup()

    responderGetPedido('pendiente')
    render(<ConfirmacionPedido pedido={pedidoFixture} />)
    expect(screen.getByText('pendiente')).toBeInTheDocument()

    responderGetPedido('entregado')

    await user.click(screen.getByRole('button', { name: 'Actualizar estado' }))

    expect(await screen.findByText('entregado')).toBeInTheDocument()
    expect(screen.getByText('$17.220')).toBeInTheDocument()
  })

  it('muestra error y conserva datos anteriores si falla la consulta', async () => {
    const user = userEvent.setup()

    responderGetPedido('pendiente')
    render(<ConfirmacionPedido pedido={pedidoFixture} />)
    expect(screen.getByText('pendiente')).toBeInTheDocument()

    responderGetPedidoError()

    await user.click(screen.getByRole('button', { name: 'Actualizar estado' }))

    expect(await screen.findByText(/Pedido no encontrado/)).toBeInTheDocument()
    expect(screen.getByText('pendiente')).toBeInTheDocument()
    expect(screen.getByText('$17.220')).toBeInTheDocument()
  })
})