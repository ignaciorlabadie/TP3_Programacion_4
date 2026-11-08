import type { APIRequestContext } from '@playwright/test'

const API_BASE_URL = 'http://localhost:3000'

export async function reiniciarPedidos(request: APIRequestContext) {
  const reset = await request.post(`${API_BASE_URL}/__test__/reset`)
  if (!reset.ok()) {
    throw new Error(`No se pudo reiniciar los pedidos: ${reset.status()}`)
  }

  const seed = await request.post(`${API_BASE_URL}/__test__/seed`)
  if (!seed.ok()) {
    throw new Error(`No se pudo cargar la semilla de pedidos: ${seed.status()}`)
  }
}