import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { CarritoProvider, useCarrito } from '../../context/CarritoContext'

function TestComponent() {
  const { items, agregar, total, estaVacío, vaciar } = useCarrito()

  return (
    <div>
      <span data-testid="items-count">{items.length}</span>
      <span data-testid="total">{total}</span>
      <span data-testid="estaVacío">{estaVacío.toString()}</span>
      <button
        data-testid="boton-agregar"
        onClick={() =>
          agregar({
            id: 19,
            nombre: 'Muffin de chocolate',
            precio: 2500,
            tipo: 'pasteleria',
          })
        }
      >
        Agregar
      </button>
      <button data-testid="boton-vaciar" onClick={vaciar}>
        Vaciar
      </button>
    </div>
  )
}

describe('CarritoContext', () => {
  it('provee un carrito vacío al iniciar', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    )

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total')).toHaveTextContent('0')
    expect(screen.getByTestId('estaVacío')).toHaveTextContent('true')
  })

  it('agrega un producto al carrito mediante el contexto', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    )

    const boton = screen.getByTestId('boton-agregar')
    act(() => {
      boton.click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')
    expect(screen.getByTestId('total')).toHaveTextContent('2500')
    expect(screen.getByTestId('estaVacío')).toHaveTextContent('false')
  })

  it('vacía el carrito mediante el contexto', () => {
    render(
      <CarritoProvider>
        <TestComponent />
      </CarritoProvider>
    )

    const botonAgregar = screen.getByTestId('boton-agregar')
    const botonVaciar = screen.getByTestId('boton-vaciar')

    act(() => {
      botonAgregar.click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('1')

    act(() => {
      botonVaciar.click()
    })

    expect(screen.getByTestId('items-count')).toHaveTextContent('0')
    expect(screen.getByTestId('total')).toHaveTextContent('0')
    expect(screen.getByTestId('estaVacío')).toHaveTextContent('true')
  })

  it('lanza error si se usa useCarrito fuera del provider', () => {
    expect(() => {
      render(<TestComponent />)
    }).toThrow(/useCarrito debe usarse dentro de un CarritoProvider/)
  })
})