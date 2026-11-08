const PATRON_MESA = /^\d+$/

export const MESA_MIN = 1
export const MESA_MAX = 10

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

  if (!Number.isSafeInteger(mesa)) {
    return null
  }

  return mesa >= MESA_MIN && mesa <= MESA_MAX ? mesa : null
}
