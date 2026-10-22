import { describe, it, expect } from "vitest";
import { Expreso } from "../../src/models/expreso.js";
import { Variedad } from "../../src/models/variedad.js";

describe("Expreso", () => {
  it("pocillo brasil cuesta 5020", () => {
    const expreso = new Expreso(1, "Expreso Pocillo Brasil", "Pocillo", Variedad.BRASIL, 18);
    expect(expreso.calcularPrecio()).toBe(5020);
  });
});
