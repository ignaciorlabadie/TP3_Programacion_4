import { formatearPrecio } from '../domain/precio'
import type { ItemCarrito } from '../domain/carrito'

type Props = {
  items: ItemCarrito[]
  onSumar: (productoId: number) => void
  onRestar: (productoId: number) => void
  onQuitar: (productoId: number) => void
  total: number
  estaVacío: boolean
  onConfirmar: () => void
}

export function Carrito({
  items,
  onSumar,
  onRestar,
  onQuitar,
  total,
  estaVacío,
  onConfirmar,
}: Props) {
  if (estaVacío || items.length === 0) {
    return (
      <section className="carrito" aria-label="Carrito de pedidos">
        <h2 className="h5 mb-3">Carrito</h2>
        <p className="text-body-secondary">El carrito está vacío</p>
        <button
          type="button"
          className="btn btn-primary w-100"
          disabled
          onClick={onConfirmar}
        >
          Confirmar pedido
        </button>
      </section>
    )
  }

  return (
    <section className="carrito" aria-label="Carrito de pedidos">
      <h2 className="h5 mb-3">Carrito</h2>
      <div className="list-group list-group-flush mb-3">
        {items.map((item) => (
          <div
            key={item.productoId}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <div className="fw-semibold">{item.nombre}</div>
              <div className="text-small text-body-secondary">
                {formatearPrecio(item.precio)} x {item.cantidad}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                aria-label={`Restar ${item.nombre}`}
                onClick={() => onRestar(item.productoId)}
              >
                −
              </button>
              <span className="badge bg-secondary">{item.cantidad}</span>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                aria-label={`Sumar ${item.nombre}`}
                onClick={() => onSumar(item.productoId)}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                aria-label={`Quitar ${item.nombre}`}
                onClick={() => onQuitar(item.productoId)}
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-semibold">Subtotal</span>
        <span className="fw-bold">{formatearPrecio(total)}</span>
      </div>
      <button
        type="button"
        className="btn btn-primary w-100"
        disabled={estaVacío}
        onClick={onConfirmar}
      >
        Confirmar pedido
      </button>
    </section>
  )
}
