import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Carrito } from '../../components/Carrito'
import type { ItemCarrito } from '../../domain/carrito'

type Props = {
  items: ItemCarrito[]
  onSumar: (productoId: number) => void
  onRestar: (productoId: number) => void
  onQuitar: (productoId: number) => void
  total: number
  estaVacío: boolean
  onConfirmar: () => void
}

const items: ItemCarrito[] = [
  { productoId: 19, nombre: 'Muffin de chocolate', precio: 2500, cantidad: 1 },
  { productoId: 5, nombre: 'Expreso Mediano Colombia', precio: 7360, cantidad: 2 },
]

function renderCarrito(overrides: Partial<Props> = {}) {
  const onSumar = vi.fn()
  const onRestar = vi.fn()
  const onQuitar = vi.fn()
  const onConfirmar = vi.fn()
  const user = userEvent.setup()

  const props: Props = {
    items: [],
    onSumar,
    onRestar,
    onQuitar,
    total: 0,
    estaVacío: true,
    onConfirmar,
    ...overrides,
  }

  render(<Carrito {...props} />)
  return { onSumar, onRestar, onQuitar, onConfirmar, user }
}

describe('Carrito', () => {
  it('muestra mensaje cuando está vacío', () => {
    renderCarrito()

    expect(screen.getByText('El carrito está vacío')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Confirmar pedido' })
    ).toBeDisabled()
  })

  it('muestra los items con nombre, precio y cantidad', () => {
    renderCarrito({ items, estaVacío: false, total: 17220 })

    expect(screen.getByText('Muffin de chocolate')).toBeInTheDocument()
    expect(screen.getByText('Expreso Mediano Colombia')).toBeInTheDocument()
  })

  it('muestra el subtotal por línea además del subtotal general', () => {
    renderCarrito({ items, estaVacío: false, total: 17220 })

    expect(screen.getByText('Subtotal: $2.500')).toBeInTheDocument()
    expect(screen.getByText('Subtotal: $14.720')).toBeInTheDocument()
    expect(screen.getByText('$17.220')).toBeInTheDocument()
  })

  it('sumar aumenta la cantidad de un producto', async () => {
    const { onSumar, user } = renderCarrito({
      items,
      estaVacío: false,
      total: 17220,
    })

    await user.click(
      screen.getByRole('button', { name: 'Sumar Expreso Mediano Colombia' })
    )
    expect(onSumar).toHaveBeenCalledWith(5)
  })

  it('restar disminuye la cantidad de un producto', async () => {
    const { onRestar, user } = renderCarrito({
      items,
      estaVacío: false,
      total: 17220,
    })

    await user.click(
      screen.getByRole('button', { name: 'Restar Muffin de chocolate' })
    )
    expect(onRestar).toHaveBeenCalledWith(19)
  })

  it('quitar elimina un producto', async () => {
    const { onQuitar, user } = renderCarrito({
      items,
      estaVacío: false,
      total: 17220,
    })

    await user.click(
      screen.getByRole('button', { name: 'Quitar Muffin de chocolate' })
    )
    expect(onQuitar).toHaveBeenCalledWith(19)
  })

  it('habilita el botón confirmar cuando hay items', () => {
    renderCarrito({ items, estaVacío: false, total: 17220 })

    expect(
      screen.getByRole('button', { name: 'Confirmar pedido' })
    ).toBeEnabled()
  })
})