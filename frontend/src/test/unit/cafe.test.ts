import { describe, expect, it } from 'vitest'
import type { Producto } from '../../schemas/productoSchema'
import { buscarCafe } from '../../domain/cafe'

const productos = [
  {
    id: 5,
    tipo: 'expreso',
    nombre: 'Expreso Mediano Colombia',
    tamanio: 'Mediano',
    gramosCafe: 27,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 7360,
  },
  {
    id: 14,
    tipo: 'filtrado',
    nombre: 'Filtrado Mediano Colombia',
    tamanio: 'Mediano',
    gramosCafe: 15,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 5900,
  },
  {
    id: 1,
    tipo: 'expreso',
    nombre: 'Expreso Pocillo Brasil',
    tamanio: 'Pocillo',
    gramosCafe: 18,
    variedad: {
      nombre: 'Brasil',
      descripcion: 'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
    },
    precio: 5020,
  },
  {
    id: 19,
    tipo: 'pasteleria',
    nombre: 'Muffin de chocolate',
    precio: 2500,
  },
] satisfies Producto[]

describe('buscarCafe', () => {
  it('encuentra el expreso mediano de Colombia', () => {
    expect(
      buscarCafe(productos, {
        bebida: 'expreso',
        tamanio: 'Mediano',
        origen: 'Colombia',
      }),
    ).toMatchObject({ id: 5, tipo: 'expreso', precio: 7360 })
  })

  it('distingue expreso de filtrado con mismo tamaño y origen', () => {
    expect(
      buscarCafe(productos, {
        bebida: 'filtrado',
        tamanio: 'Mediano',
        origen: 'Colombia',
      }),
    ).toMatchObject({ id: 14, tipo: 'filtrado' })
  })

  it.each([
    { bebida: null, tamanio: 'Mediano', origen: 'Colombia' },
    { bebida: 'expreso', tamanio: null, origen: 'Colombia' },
    { bebida: 'expreso', tamanio: 'Mediano', origen: null },
  ] as const)(
    'devuelve undefined si falta una elección: %o',
    (seleccion) => {
      expect(buscarCafe(productos, seleccion)).toBeUndefined()
    },
  )

  it('devuelve undefined si la combinación no existe', () => {
    expect(
      buscarCafe(productos, {
        bebida: 'filtrado',
        tamanio: 'Taza grande',
        origen: 'Colombia',
      }),
    ).toBeUndefined()
  })

  it('ignora los productos de pastelería', () => {
    expect(
      buscarCafe(productos, {
        bebida: 'expreso',
        tamanio: 'Pocillo',
        origen: 'Colombia',
      }),
    ).toBeUndefined()
  })
})