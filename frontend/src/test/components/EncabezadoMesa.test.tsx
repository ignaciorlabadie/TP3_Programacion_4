import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EncabezadoMesa } from '../../components/EncabezadoMesa'

describe('EncabezadoMesa', () => {
  it('muestra el número de mesa', () => {
    render(<EncabezadoMesa mesa={4} />)

    expect(screen.getByText('Mesa 4')).toBeInTheDocument()
  })

  it('indica retiro en la barra si no hay mesa', () => {
    render(<EncabezadoMesa mesa={null} />)

    expect(screen.getByText('Retirar en la barra')).toBeInTheDocument()
    expect(screen.queryByText(/Mesa \d/)).not.toBeInTheDocument()
  })
})
