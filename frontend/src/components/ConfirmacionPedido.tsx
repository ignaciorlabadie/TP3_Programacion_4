import { useState } from 'react'
import { ErrorApi, getPedido } from '../api/cliente'
import type { Pedido } from '../api/cliente'
import { formatearPrecio } from '../domain/precio'

type Props = {
  pedido: Pedido
}

export function ConfirmacionPedido({ pedido: pedidoInicial }: Props) {
  const [pedido, setPedido] = useState(pedidoInicial)
  const [error, setError] = useState<string | null>(null)
  const [actualizando, setActualizando] = useState(false)

  const actualizarEstado = async () => {
    setError(null)
    setActualizando(true)

    try {
      const actualizado = await getPedido(pedido.id)
      setPedido(actualizado)
    } catch (err: unknown) {
      if (err instanceof ErrorApi) {
        setError(err.message)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('No se pudo actualizar el estado del pedido')
      }
      // se conservan los datos anteriores de `pedido`
    } finally {
      setActualizando(false)
    }
  }

  return (
    <section className="card p-4 mb-4" aria-label="Confirmación de pedido">
      <h2 className="h5 mb-3">Pedido confirmado</h2>
      <p>
        <strong>Número:</strong> {pedido.id}
      </p>
      <p>
        <strong>Estado:</strong> {pedido.estado}
      </p>
      <p>
        <strong>Total:</strong> {formatearPrecio(pedido.total)}
      </p>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}

      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={actualizarEstado}
        disabled={actualizando}
      >
        {actualizando ? 'Actualizando...' : 'Actualizar estado'}
      </button>
    </section>
  )
}