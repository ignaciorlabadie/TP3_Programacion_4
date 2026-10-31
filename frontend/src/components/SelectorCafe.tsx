import type { Producto } from '../schemas/productoSchema'

type Props = {
  productos: readonly Producto[]
  onAgregar: (producto: Producto) => void
}

export function SelectorCafe({ productos }: Props) {
  return (
    <p className="text-body-secondary">
      {productos.length} productos disponibles para elegir tu café.
    </p>
  )
}
