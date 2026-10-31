import { setupServer } from 'msw/node'
import { handlersProductos } from './handlers.productos'

export const server = setupServer(...handlersProductos)
