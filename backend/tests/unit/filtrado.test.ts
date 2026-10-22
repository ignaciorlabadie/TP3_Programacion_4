import { describe, it, expect } from "vitest";
import { Filtrado } from "../../src/models/filtrado.js";
import { Variedad } from "../../src/models/variedad.js";

describe("Filtrado", () => {
  it("pocillo brasil cuesta 4040", () => {
    const filtrado = new Filtrado(10, "Filtrado Pocillo Brasil", "Pocillo", Variedad.BRASIL, 6);
    expect(filtrado.calcularPrecio()).toBe(4040);
  });
});
