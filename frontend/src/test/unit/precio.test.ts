import { describe, expect, it } from 'vitest'
import { formatearPrecio } from '../../domain/precio'

describe('formatearPrecio', () => {
  it('formatea miles con punto y símbolo de peso', () => {
    expect(formatearPrecio(7360)).toBe('$7.360')
  })

  it('formatea precios de cuatro cifras', () => {
    expect(formatearPrecio(2500)).toBe('$2.500')
  })

  it('formatea totales de cinco cifras', () => {
    expect(formatearPrecio(17220)).toBe('$17.220')
  })

  it('formatea cero', () => {
    expect(formatearPrecio(0)).toBe('$0')
  })
})