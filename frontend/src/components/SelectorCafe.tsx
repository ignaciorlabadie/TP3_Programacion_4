import { useState } from 'react'
import {
  buscarCafe,
  origenesDisponibles,
  type Bebida,
  type Origen,
  type Tamanio,
} from '../domain/cafe'
import { formatearPrecio } from '../domain/precio'
import type { Producto } from '../schemas/productoSchema'

type Props = {
  productos: readonly Producto[]
  onAgregar: (producto: Producto) => void
}

const BEBIDAS: readonly { valor: Bebida; etiqueta: string }[] = [
  { valor: 'expreso', etiqueta: 'Expreso' },
  { valor: 'filtrado', etiqueta: 'Filtrado' },
]

const TAMANIOS: readonly Tamanio[] = ['Pocillo', 'Mediano', 'Taza grande']

export function SelectorCafe({ productos, onAgregar }: Props) {
  const [bebida, setBebida] = useState<Bebida | null>(null)
  const [tamanio, setTamanio] = useState<Tamanio | null>(null)
  const [origen, setOrigen] = useState<Origen | null>(null)

  const origenes = origenesDisponibles(productos)
  const seleccionado = buscarCafe(productos, { bebida, tamanio, origen })

  const agregar = () => {
    if (seleccionado) {
      onAgregar(seleccionado)
    }
  }

  const precioDeOrigen = (nombre: Origen) =>
    buscarCafe(productos, { bebida, tamanio, origen: nombre })

  return (
    <div className="d-grid gap-3">
      <fieldset>
        <legend className="h6">Bebida</legend>
        {BEBIDAS.map((opcion) => {
          const id = `bebida-${opcion.valor}`

          return (
            <div className="form-check" key={opcion.valor}>
              <input
                className="form-check-input"
                type="radio"
                name="bebida"
                id={id}
                value={opcion.valor}
                checked={bebida === opcion.valor}
                onChange={() => setBebida(opcion.valor)}
              />
              <label className="form-check-label" htmlFor={id}>
                {opcion.etiqueta}
              </label>
            </div>
          )
        })}
      </fieldset>

      <fieldset>
        <legend className="h6">Tamaño</legend>
        {TAMANIOS.map((opcion) => {
          const id = `tamanio-${opcion.toLowerCase().replace(' ', '-')}`

          return (
            <div className="form-check" key={opcion}>
              <input
                className="form-check-input"
                type="radio"
                name="tamanio"
                id={id}
                value={opcion}
                checked={tamanio === opcion}
                onChange={() => setTamanio(opcion)}
              />
              <label className="form-check-label" htmlFor={id}>
                {opcion}
              </label>
            </div>
          )
        })}
      </fieldset>

      <fieldset>
        <legend className="h6">Origen</legend>
        {origenes.map((opcion) => {
          const id = `origen-${opcion.nombre}`
          const descripcionId = `origen-descripcion-${opcion.nombre}`
          const cafe = precioDeOrigen(opcion.nombre)

          return (
            <div className="mb-2" key={opcion.nombre}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="origen"
                  id={id}
                  value={opcion.nombre}
                  checked={origen === opcion.nombre}
                  onChange={() => setOrigen(opcion.nombre)}
                  aria-describedby={descripcionId}
                />
                <label className="form-check-label" htmlFor={id}>
                  {opcion.nombre}
                </label>
              </div>
              <p id={descripcionId} className="form-text mb-0">
                {opcion.descripcion}
              </p>
              {cafe && (
                <span className="fw-semibold">
                  {formatearPrecio(cafe.precio)}
                </span>
              )}
            </div>
          )
        })}
      </fieldset>

      <button
        type="button"
        className="btn btn-primary"
        disabled={!seleccionado}
        onClick={agregar}
      >
        Agregar
      </button>
    </div>
  )
}
