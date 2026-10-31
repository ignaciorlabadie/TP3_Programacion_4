import { useEffect, useState } from 'react'
import { ErrorApi, ErrorContrato, getProductos } from '../api/cliente'
import type { Producto } from '../schemas/productoSchema'
import { Pasteleria } from './Pasteleria'
import { SelectorCafe } from './SelectorCafe'

type EstadoProductos =
  | { estado: 'cargando' }
  | { estado: 'error'; mensaje: string }
  | { estado: 'listo'; productos: Producto[] }

type Props = {
  onAgregar: (producto: Producto) => void
}

function mensajeDeError(error: unknown): string {
  if (error instanceof ErrorApi || error instanceof ErrorContrato) {
    return error.message
  }

  return 'Ocurrió un error inesperado al cargar el menú'
}

export function MenuProductos({ onAgregar }: Props) {
  const [estado, setEstado] = useState<EstadoProductos>({ estado: 'cargando' })

  useEffect(() => {
    let activo = true

    getProductos()
      .then((productos) => {
        if (activo) {
          setEstado({ estado: 'listo', productos })
        }
      })
      .catch((error: unknown) => {
        if (activo) {
          setEstado({ estado: 'error', mensaje: mensajeDeError(error) })
        }
      })

    return () => {
      activo = false
    }
  }, [])

  const reintentar = () => {
    setEstado({ estado: 'cargando' })

    getProductos()
      .then((productos) => setEstado({ estado: 'listo', productos }))
      .catch((error: unknown) =>
        setEstado({ estado: 'error', mensaje: mensajeDeError(error) }),
      )
  }

  if (estado.estado === 'cargando') {
    return (
      <p role="status" aria-live="polite" className="text-center my-4">
        Cargando menú...
      </p>
    )
  }

  if (estado.estado === 'error') {
    return (
      <div role="alert" aria-live="polite" className="alert alert-danger">
        <p className="mb-2">{estado.mensaje}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={reintentar}
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="row g-4">
      <section className="col-12" aria-labelledby="titulo-cafe">
        <h2 id="titulo-cafe" className="h4">
          Café
        </h2>
        <SelectorCafe productos={estado.productos} onAgregar={onAgregar} />
      </section>
      <section className="col-12" aria-labelledby="titulo-pasteleria">
        <h2 id="titulo-pasteleria" className="h4">
          Pastelería
        </h2>
        <Pasteleria productos={estado.productos} onAgregar={onAgregar} />
      </section>
    </div>
  )
}
