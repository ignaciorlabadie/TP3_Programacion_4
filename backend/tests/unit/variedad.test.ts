import { describe, it, expect } from "vitest";
import { Variedad, precioPorGramo } from "../../src/models/variedad.js";

describe("Variedad", () => {
  it.each([
    [Variedad.BRASIL, 140],
    [Variedad.COLOMBIA, 180],
    [Variedad.ETIOPIA, 240],
  ])("%s tiene precio por gramo %i", (variedad, precio) => {
    expect(precioPorGramo(variedad)).toBe(precio);
  });
});
