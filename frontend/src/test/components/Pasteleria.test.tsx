import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pasteleria } from '../../components/Pasteleria'
import { productosFixture } from '../msw/fixtures'

function renderPasteleria() {
  const onAgregar = vi.fn()
  render(<Pasteleria productos={productosFixture} onAgregar={onAgregar} />)
  return { onAgregar, user: userEvent.setup() }
}

describe('Pasteleria', () => {
  it('muestra el muffin con su precio', () => {
    renderPasteleria()

    expect(screen.getByText('Muffin de chocolate')).toBeInTheDocument()
    expect(screen.getByText('$2.500')).toBeInTheDocument()
  })

  it('muestra la torta selva negra con su precio', () => {
    renderPasteleria()

    expect(screen.getByText('Torta selva negra')).toBeInTheDocument()
    expect(screen.getByText('$4.200')).toBeInTheDocument()
  })

  it('no muestra cafés', () => {
    renderPasteleria()

    expect(
      screen.queryByText('Expreso Mediano Colombia'),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
  })

  it('agrega el muffin de chocolate', async () => {
    const { onAgregar, user } = renderPasteleria()

    await user.click(
      screen.getByRole('button', { name: 'Agregar Muffin de chocolate' }),
    )

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(
      expect.objectContaining({ id: 19, tipo: 'pasteleria', precio: 2500 }),
    )
  })

  it('agrega la torta selva negra', async () => {
    const { onAgregar, user } = renderPasteleria()

    await user.click(
      screen.getByRole('button', { name: 'Agregar Torta selva negra' }),
    )

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(
      expect.objectContaining({ id: 20, tipo: 'pasteleria', precio: 4200 }),
    )
  })
})
