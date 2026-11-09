import { setupServer } from 'msw/node'
import { handlersProductos } from './handlers.productos'
import { handlersPedidos } from './handlers.pedidos'

export const server = setupServer(
  ...handlersProductos,
  ...handlersPedidos,
)