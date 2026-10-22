import { describe, it, expect } from "vitest";
import type { ItemPedido } from "../../src/models/itemPedido.js";

describe("ItemPedido", () => {
  it("tiene productoId y cantidad", () => {
    const item: ItemPedido = { productoId: 1, cantidad: 2 };
    expect(item.productoId).toBe(1);
    expect(item.cantidad).toBe(2);
  });
});
