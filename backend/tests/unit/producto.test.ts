import { describe, it, expect } from "vitest";
import { Expreso } from "../../src/models/expreso.js";
import { Filtrado } from "../../src/models/filtrado.js";
import { Pasteleria } from "../../src/models/pasteleria.js";
import { Variedad } from "../../src/models/variedad.js";

describe("Producto.tipo", () => {
  it("un expreso es de tipo expreso", () => {
    const expreso = new Expreso(1, "Expreso", "Pocillo", Variedad.BRASIL, 18);
    expect(expreso.tipo).toBe("expreso");
  });

  it("un filtrado es de tipo filtrado", () => {
    const filtrado = new Filtrado(10, "Filtrado", "Pocillo", Variedad.BRASIL, 6);
    expect(filtrado.tipo).toBe("filtrado");
  });

  it("una pastelería es de tipo pasteleria", () => {
    const pasteleria = new Pasteleria(19, "Muffin de chocolate", 2500);
    expect(pasteleria.tipo).toBe("pasteleria");
  });
});
