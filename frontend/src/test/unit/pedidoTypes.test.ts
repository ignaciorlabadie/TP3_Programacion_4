import { describe, expectTypeOf, it } from 'vitest'
import type {
  CrearPedidoBody as CrearPedidoBodyCliente,
  Pedido as PedidoCliente,
} from '../../api/cliente'
import type {
  CrearPedidoBody,
  Pedido,
} from '../../schemas/pedidoSchema'

describe('contrato público de pedidos', () => {
  it('reexporta los tipos inferidos de los schemas', () => {
    expectTypeOf<PedidoCliente>().toEqualTypeOf<Pedido>()
    expectTypeOf<CrearPedidoBodyCliente>().toEqualTypeOf<CrearPedidoBody>()
  })
})
