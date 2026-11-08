import { describe, expect, it } from 'vitest'
import { leerMesa } from '../../domain/mesa'

describe('leerMesa', () => {
  it.each([
    ['?mesa=1', 1],
    ['?mesa=4', 4],
    ['?mesa=10', 10],
    ['?otro=1&mesa=7', 7],
    ['?mesa=04', 4],
  ])('lee la mesa válida de "%s"', (search, esperado) => {
    expect(leerMesa(search)).toBe(esperado)
  })

  it.each([
    '',
    '?mesa=',
    '?mesa=abc',
    '?mesa=0',
    '?mesa=-1',
    '?mesa=1.5',
    '?mesa=%204',
    '?mesa=4abc',
    '?mesa=4&mesa=5',
    '?otro=1',
    '?mesa=11',
    '?mesa=12',
    '?mesa=999',
  ])('devuelve null para "%s"', (search) => {
    expect(leerMesa(search)).toBeNull()
  })

  it('devuelve null si la mesa supera el entero seguro', () => {
    expect(leerMesa('?mesa=999999999999999999999')).toBeNull()
  })
})
