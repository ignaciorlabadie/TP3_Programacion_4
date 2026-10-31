import { formatearPrecio } from '../domain/precio'
import type { Producto, ProductoPasteleria } from '../schemas/productoSchema'

type Props = {
  productos: readonly Producto[]
  onAgregar: (producto: Producto) => void
}

function esPasteleria(producto: Producto): producto is ProductoPasteleria {
  return producto.tipo === 'pasteleria'
}

export function Pasteleria({ productos, onAgregar }: Props) {
  const postres = productos.filter(esPasteleria)

  return (
    <div className="row g-3">
      {postres.map((producto) => (
        <div className="col-12 col-md-6" key={producto.id}>
          <div className="card h-100">
            <div className="card-body d-flex flex-column gap-2">
              <h3 className="h6 mb-0">{producto.nombre}</h3>
              <p className="mb-0 fw-semibold">
                {formatearPrecio(producto.precio)}
              </p>
              <button
                type="button"
                className="btn btn-primary mt-auto"
                aria-label={`Agregar ${producto.nombre}`}
                onClick={() => onAgregar(producto)}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
