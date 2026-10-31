import type { Producto } from '../schemas/productoSchema'

type Props = {
  productos: readonly Producto[]
  onAgregar: (producto: Producto) => void
}

export function Pasteleria({ productos }: Props) {
  return (
    <p className="text-body-secondary">
      {productos.length} productos en el menú.
    </p>
  )
}
