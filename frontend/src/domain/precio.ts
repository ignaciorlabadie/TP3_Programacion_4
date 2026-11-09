const formatoPeso = new Intl.NumberFormat('es-AR', {
  maximumFractionDigits: 0,
})

export function formatearPrecio(precio: number): string {
  return `$${formatoPeso.format(precio)}`
}