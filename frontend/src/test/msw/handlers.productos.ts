import { http, HttpResponse } from 'msw'
import { productosFixture } from './fixtures'

const apiUrl = 'http://localhost:5173/api'

export const handlersProductos = [
  http.get(`${apiUrl}/productos`, () => HttpResponse.json(productosFixture)),
]
