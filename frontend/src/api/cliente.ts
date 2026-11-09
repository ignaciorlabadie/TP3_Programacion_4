import { z } from 'zod'
import { errorSchema } from '../schemas/error'
import {
  pedidoSchema,
  type ItemPedido,
  type Pedido,
} from '../schemas/pedidoSchema'
import { productoSchema, type Producto } from '../schemas/productoSchema'
import { crearCuerpoPedido } from '../domain/pedido'

export type { CrearPedidoBody, Pedido } from '../schemas/pedidoSchema'

const API_URL = '/api'

export class ErrorApi extends Error {
  readonly status: number

  constructor(mensaje: string, status: number) {
    super(mensaje)
    this.name = 'ErrorApi'
    this.status = status
  }
}

export class ErrorContrato extends Error {
  constructor(mensaje = 'La respuesta de la API no cumple el contrato') {
    super(mensaje)
    this.name = 'ErrorContrato'
  }
}

function urlApi(ruta: string): string {
  return new URL(`${API_URL}${ruta}`, window.location.origin).toString()
}

async function leerJson(respuesta: Response): Promise<unknown> {
  try {
    return await respuesta.json()
  } catch {
    return undefined
  }
}

async function pedir<T>(
  ruta: string,
  schema: z.ZodType<T>,
  init?: RequestInit,
): Promise<T> {
  let respuesta: Response

  try {
    respuesta = await fetch(urlApi(ruta), init)
  } catch {
    throw new ErrorApi('No se pudo conectar con la API', 0)
  }

  const cuerpo = await leerJson(respuesta)

  if (!respuesta.ok) {
    const resultado = errorSchema.safeParse(cuerpo)
    throw new ErrorApi(
      resultado.success
        ? resultado.data.error
        : 'La API respondió con un error',
      respuesta.status,
    )
  }

  const resultado = schema.safeParse(cuerpo)
  if (!resultado.success) {
    throw new ErrorContrato()
  }

  return resultado.data
}

export async function getProductos(): Promise<Producto[]> {
  return pedir('/productos', z.array(productoSchema))
}

export async function crearPedido(
  mesaId: number | null,
  items: readonly ItemPedido[],
): Promise<Pedido> {
  return pedir('/pedidos', pedidoSchema, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(crearCuerpoPedido(items, mesaId)),
  })
}

export async function getPedido(id: number): Promise<Pedido> {
  return pedir(`/pedidos/${id}`, pedidoSchema)
}