import { describe, it, expect } from "vitest";
import { Pasteleria } from "../../src/models/pasteleria.js";

describe("Pasteleria", () => {
  it("muffin de chocolate cuesta 2500", () => {
    const muffin = new Pasteleria(19, "Muffin de chocolate", 2500);
    expect(muffin.calcularPrecio()).toBe(2500);
  });

  it("torta selva negra cuesta 4200", () => {
    const torta = new Pasteleria(20, "Torta selva negra", 4200);
    expect(torta.calcularPrecio()).toBe(4200);
  });
});
