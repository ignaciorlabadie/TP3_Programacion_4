import { describe, expect, it } from 'vitest'
import type { Producto } from '../../schemas/productoSchema'
import { origenesDisponibles } from '../../domain/cafe'

const productos = [
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
    id: 11,
    tipo: 'filtrado',
    nombre: 'Filtrado Pocillo Colombia',
    tamanio: 'Pocillo',
    gramosCafe: 6,
    variedad: {
      nombre: 'Colombia',
      descripcion:
        'Acidez media, cuerpo equilibrado y notas cítricas y florales',
    },
    precio: 4280,
  },
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
    id: 15,
    tipo: 'filtrado',
    nombre: 'Filtrado Mediano Etiopia',
    tamanio: 'Mediano',
    gramosCafe: 15,
    variedad: {
      nombre: 'Etiopia',
      descripcion: 'Acidez alta, cuerpo ligero y notas florales y frutales',
    },
    precio: 6800,
  },
  {
    id: 19,
    tipo: 'pasteleria',
    nombre: 'Muffin de chocolate',
    precio: 2500,
  },
] satisfies Producto[]

describe('origenesDisponibles', () => {
  it('devuelve cada origen una sola vez, con su descripción', () => {
    expect(origenesDisponibles(productos)).toEqual([
      {
        nombre: 'Brasil',
        descripcion:
          'Acidez baja, cuerpo cremoso y notas a chocolate y nuez',
      },
      {
        nombre: 'Colombia',
        descripcion:
          'Acidez media, cuerpo equilibrado y notas cítricas y florales',
      },
      {
        nombre: 'Etiopia',
        descripcion:
          'Acidez alta, cuerpo ligero y notas florales y frutales',
      },
    ])
  })

  it('conserva el orden de aparición del menú', () => {
    expect(origenesDisponibles(productos).map((origen) => origen.nombre)).toEqual([
      'Brasil',
      'Colombia',
      'Etiopia',
    ])
  })

  it('ignora los productos de pastelería', () => {
    expect(
      origenesDisponibles([
        {
          id: 19,
          tipo: 'pasteleria',
          nombre: 'Muffin de chocolate',
          precio: 2500,
        },
      ]),
    ).toEqual([])
  })

  it('devuelve un arreglo vacío si no hay productos', () => {
    expect(origenesDisponibles([])).toEqual([])
  })
})