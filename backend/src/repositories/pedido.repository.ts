import { Pedido } from "../models/pedido.js";
import type { ItemPedido } from "../models/itemPedido.js";

export class PedidoRepository {
  private readonly pedidos: Pedido[] = [];
  private nextId = 1;

  getAll(): Pedido[] {
    return this.pedidos;
  }

  getById(id: number): Pedido | undefined {
    return this.pedidos.find((pedido) => pedido.id === id);
  }

  crear(items: ItemPedido[], estado: string, mesaId?: number): Pedido {
    const pedido = new Pedido(this.nextId++, items, estado, mesaId);
    this.pedidos.push(pedido);
    return pedido;
  }

  reset(): void {
    this.pedidos.length = 0;
    this.nextId = 1;
  }
}
