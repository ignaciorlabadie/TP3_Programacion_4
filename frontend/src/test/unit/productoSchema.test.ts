
import { describe, expect, it } from 'vitest'
import { productoSchema } from '../../schemas/productoSchema'

describe('productoSchema', () => {
  it('debe validar un producto de tipo expreso', () => {
    const producto = {
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
    }

    expect(productoSchema.safeParse(producto).success).toBe(true)
  })

  it('debe validar un producto de tipo filtrado', () => {
    const producto = {
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
    }

    expect(productoSchema.safeParse(producto).success).toBe(true)
  })

  it('debe validar un producto de tipo pasteleria', () => {
    const producto = {
      id: 19,
      tipo: 'pasteleria',
      nombre: 'Muffin de chocolate',
      precio: 2500,
    }

    expect(productoSchema.safeParse(producto).success).toBe(true)
  })

  it('debe rechazar un producto con un tipo desconocido', () => {
    const producto = {
      id: 5,
      tipo: 'te',
      nombre: 'Té',
      precio: 1000,
    }

    expect(productoSchema.safeParse(producto).success).toBe(false)
  })

  it('debe rechazar un producto sin precio', () => {
    const producto = {
      id: 19,
      tipo: 'pasteleria',
      nombre: 'Muffin de chocolate',
    }

    expect(productoSchema.safeParse(producto).success).toBe(false)
  })

  it('debe rechazar un precio que no sea numérico', () => {
    const producto = {
      id: 19,
      tipo: 'pasteleria',
      nombre: 'Muffin de chocolate',
      precio: '2500',
    }

    expect(productoSchema.safeParse(producto).success).toBe(false)
  })
})
