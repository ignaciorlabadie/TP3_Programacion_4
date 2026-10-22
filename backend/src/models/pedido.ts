import type { ItemPedido } from "./itemPedido.js";

export class Pedido {
  constructor(
    public readonly id: number,
    public readonly items: ItemPedido[],
    public readonly estado: string = "pendiente",
  ) {}
}
