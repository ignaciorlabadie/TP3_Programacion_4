import { useState } from 'react'
import { getPedido } from '../api/cliente'
import type { Pedido } from '../api/cliente'
import { formatearPrecio } from '../domain/precio'

type Props = {
  pedido: Pedido
}

type ConsultaPedido = {
  id: number
  pedido?: Pedido
  error?: string
}

export function ConfirmacionPedido({ pedido: pedidoInicial }: Props) {
  const [consulta, setConsulta] = useState<ConsultaPedido | null>(null)
  const [actualizando, setActualizando] = useState(false)

  const consultaActual = consulta?.id === pedidoInicial.id ? consulta : null
  const pedido = consultaActual?.pedido ?? pedidoInicial
  const error = consultaActual?.error ?? null

  const actualizarEstado = async () => {
    const id = pedidoInicial.id
    setActualizando(true)
    setConsulta((actual) =>
      actual?.id === id ? { ...actual, error: undefined } : { id }
    )

    try {
      const actualizado = await getPedido(id)
      setConsulta({ id, pedido: actualizado })
    } catch (err: unknown) {
      const mensaje =
        err instanceof Error
          ? err.message
          : 'No se pudo actualizar el estado del pedido'
      setConsulta((actual) =>
        actual?.id === id
          ? { ...actual, error: mensaje }
          : { id, error: mensaje }
      )
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