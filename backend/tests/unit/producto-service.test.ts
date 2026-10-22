import { describe, it, expect } from "vitest";
import { ProductoService } from "../../src/services/producto.service.js";

const service = new ProductoService();

describe("ProductoService", () => {
  it("lista los 20 productos del menú", () => {
    expect(service.listar()).toHaveLength(20);
  });

  it("obtiene un producto por id", () => {
    expect(service.obtenerPorId(1)?.nombre).toBe("Expreso Pocillo Brasil");
  });

  it("devuelve undefined si el id no existe", () => {
    expect(service.obtenerPorId(999)).toBeUndefined();
  });
});
