import { describe, it, expect } from "vitest";
import {
  Variedad,
  descripcionVariedad,
  precioPorGramo,
} from "../../src/models/variedad.js";

describe("Variedad", () => {
  it.each([
    [Variedad.BRASIL, 140],
    [Variedad.COLOMBIA, 180],
    [Variedad.ETIOPIA, 240],
  ])("%s tiene precio por gramo %i", (variedad, precio) => {
    expect(precioPorGramo(variedad)).toBe(precio);
  });
});

describe("descripcionVariedad", () => {
  it.each([Variedad.BRASIL, Variedad.COLOMBIA, Variedad.ETIOPIA])(
    "describe %s con acidez, cuerpo y notas",
    (variedad) => {
      const descripcion = descripcionVariedad(variedad);
      expect(descripcion).toMatch(/acidez/i);
      expect(descripcion).toMatch(/cuerpo/i);
      expect(descripcion).toMatch(/notas/i);
    },
  );

  it("Colombia usa la descripción del contrato", () => {
    expect(descripcionVariedad(Variedad.COLOMBIA)).toBe(
      "Acidez media, cuerpo equilibrado y notas cítricas y florales",
    );
  });
});
