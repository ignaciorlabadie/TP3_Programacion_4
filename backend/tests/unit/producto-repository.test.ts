import { describe, it, expect } from "vitest";
import { ProductoRepository } from "../../src/repositories/producto.repository.js";

const repo = new ProductoRepository();

describe("ProductoRepository", () => {
  it("hace seed de 20 productos", () => {
    expect(repo.getAll()).toHaveLength(20);
  });

  it("obtiene un producto por id", () => {
    expect(repo.getById(1)?.nombre).toBe("Expreso Pocillo Brasil");
  });

  it("devuelve undefined si el id no existe", () => {
    expect(repo.getById(999)).toBeUndefined();
  });
});

describe("Precios del menú (seed)", () => {
  it.each([
    [1, 5020],
    [2, 5740],
    [3, 6820],
    [4, 6280],
    [5, 7360],
    [6, 8980],
    [7, 7540],
    [8, 8980],
    [9, 11140],
    [10, 4040],
    [11, 4280],
    [12, 4640],
    [13, 5300],
    [14, 5900],
    [15, 6800],
    [16, 6700],
    [17, 7700],
    [18, 9200],
    [19, 2500],
    [20, 4200],
  ])("producto %i cuesta %i", (id, esperado) => {
    expect(repo.getById(id)?.calcularPrecio()).toBe(esperado);
  });
});
