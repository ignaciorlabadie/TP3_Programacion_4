const PATRON_MESA = /^\d+$/

export function leerMesa(search: string): number | null {
  const valores = new URLSearchParams(search).getAll('mesa')

  if (valores.length !== 1) {
    return null
  }

  const valor = valores[0]

  if (!PATRON_MESA.test(valor)) {
    return null
  }

  const mesa = Number(valor)

  return Number.isSafeInteger(mesa) && mesa > 0 ? mesa : null
}
