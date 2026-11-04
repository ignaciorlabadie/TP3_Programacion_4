import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { CarritoProvider } from '../../context/CarritoContext'

describe('App', () => {
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
})
