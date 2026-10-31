import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectorCafe } from '../../components/SelectorCafe'
import { productosFixture } from '../msw/fixtures'

function renderSelector() {
  const onAgregar = vi.fn()
  render(<SelectorCafe productos={productosFixture} onAgregar={onAgregar} />)
  return { onAgregar, user: userEvent.setup() }
}

describe('SelectorCafe', () => {
  it('muestra la descripción de cada origen', () => {
    renderSelector()

    expect(
      screen.getByText(
        'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Acidez alta, cuerpo ligero y notas florales y frutales',
      ),
    ).toBeInTheDocument()
  })

  it('no muestra precios sin bebida ni tamaño', () => {
    renderSelector()

    expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
  })

  it('no muestra precios si solo se eligió la bebida', async () => {
    const { user } = renderSelector()

    await user.click(screen.getByRole('radio', { name: 'Expreso' }))

    expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
  })

  it('muestra el precio por origen para Expreso Mediano', async () => {
    const { user } = renderSelector()

    await user.click(screen.getByRole('radio', { name: 'Expreso' }))
    await user.click(screen.getByRole('radio', { name: 'Mediano' }))

    expect(screen.getByText('$6.280')).toBeInTheDocument()
    expect(screen.getByText('$7.360')).toBeInTheDocument()
    expect(screen.getByText('$8.980')).toBeInTheDocument()
  })

  it('muestra el precio por origen para Filtrado Mediano', async () => {
    const { user } = renderSelector()

    await user.click(screen.getByRole('radio', { name: 'Filtrado' }))
    await user.click(screen.getByRole('radio', { name: 'Mediano' }))

    expect(screen.getByText('$5.300')).toBeInTheDocument()
    expect(screen.getByText('$5.900')).toBeInTheDocument()
    expect(screen.getByText('$6.800')).toBeInTheDocument()
  })

  it('mantiene el botón deshabilitado hasta completar las tres elecciones', async () => {
    const { user } = renderSelector()
    const agregar = screen.getByRole('button', { name: 'Agregar' })

    expect(agregar).toBeDisabled()

    await user.click(screen.getByRole('radio', { name: 'Expreso' }))
    expect(agregar).toBeDisabled()

    await user.click(screen.getByRole('radio', { name: 'Mediano' }))
    expect(agregar).toBeDisabled()

    await user.click(screen.getByRole('radio', { name: 'Colombia' }))
    expect(agregar).toBeEnabled()
  })

  it('agrega el café seleccionado', async () => {
    const { onAgregar, user } = renderSelector()

    await user.click(screen.getByRole('radio', { name: 'Expreso' }))
    await user.click(screen.getByRole('radio', { name: 'Mediano' }))
    await user.click(screen.getByRole('radio', { name: 'Colombia' }))
    await user.click(screen.getByRole('button', { name: 'Agregar' }))

    expect(onAgregar).toHaveBeenCalledTimes(1)
    expect(onAgregar).toHaveBeenCalledWith(
      expect.objectContaining({ id: 5, tipo: 'expreso', precio: 7360 }),
    )
  })

  it('actualiza los precios al cambiar de bebida', async () => {
    const { user } = renderSelector()

    await user.click(screen.getByRole('radio', { name: 'Expreso' }))
    await user.click(screen.getByRole('radio', { name: 'Mediano' }))
    expect(screen.getByText('$7.360')).toBeInTheDocument()

    await user.click(screen.getByRole('radio', { name: 'Filtrado' }))

    expect(screen.queryByText('$7.360')).not.toBeInTheDocument()
    expect(screen.getByText('$5.900')).toBeInTheDocument()
  })
})
