import { useState } from 'react'
import { MenuProductos } from './components/MenuProductos'
import { Carrito } from './components/Carrito'
import { ConfirmacionPedido } from './components/ConfirmacionPedido'
import { EncabezadoMesa } from './components/EncabezadoMesa'
import { crearPedido } from './api/cliente'
import { leerMesa } from './domain/mesa'
import { useCarrito } from './context/useCarrito'
import type { Pedido } from './api/cliente'

function App() {
  const [mesa] = useState<number | null>(() => leerMesa(window.location.search))
  const {
    agregar,
    items,
    sumar,
    restar,
    quitar,
    total,
    estaVacío,
    vaciar,
  } = useCarrito()
  const [pedidoConfirmado, setPedidoConfirmado] = useState<Pedido | null>(null)
  const [errorConfirmar, setErrorConfirmar] = useState<string | null>(null)
  const [confirmando, setConfirmando] = useState(false)

  const onConfirmar = async () => {
    setErrorConfirmar(null)
    setConfirmando(true)

    try {
      const pedido = await crearPedido(mesa, items)
      setPedidoConfirmado(pedido)
      vaciar() // solo se ejecuta si salió bien
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorConfirmar(err.message)
      } else {
        setErrorConfirmar('Ocurrió un error al confirmar el pedido')
      }
      // no se toca el carrito si falla
    } finally {
      setConfirmando(false)
    }
  }

  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-1">Cafetería Origen</h1>
        <EncabezadoMesa mesa={mesa} />
      </header>

      <MenuProductos onAgregar={agregar} />

      <Carrito
        items={items}
        onSumar={sumar}
        onRestar={restar}
        onQuitar={quitar}
        total={total}
        estaVacío={estaVacío}
        onConfirmar={onConfirmar}
      />

      {confirmando && (
        <p className="text-center my-3">Confirmando pedido...</p>
      )}

      {errorConfirmar && (
        <div className="alert alert-danger mb-3" role="alert">
          {errorConfirmar}
        </div>
      )}

      {pedidoConfirmado && (
        <ConfirmacionPedido pedido={pedidoConfirmado} />
      )}
    </main>
  )
}

export default App

