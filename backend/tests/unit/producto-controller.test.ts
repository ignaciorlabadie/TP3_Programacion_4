import { describe, it, expect } from "vitest";
import { Expreso } from "../../src/models/expreso.js";
import { Filtrado } from "../../src/models/filtrado.js";
import { Pasteleria } from "../../src/models/pasteleria.js";
import { Variedad } from "../../src/models/variedad.js";
import { serializarProducto } from "../../src/controllers/productos.controller.js";

describe("serializarProducto", () => {
  it("serializa un expreso con sus datos de café y descripción", () => {
    const expreso = new Expreso(
      5,
      "Expreso Mediano Colombia",
      "Mediano",
      Variedad.COLOMBIA,
      27,
    );
    expect(serializarProducto(expreso)).toEqual({
      id: 5,
      tipo: "expreso",
      nombre: "Expreso Mediano Colombia",
      tamanio: "Mediano",
      gramosCafe: 27,
      variedad: {
        nombre: "Colombia",
        descripcion:
          "Acidez media, cuerpo equilibrado y notas cítricas y florales",
      },
      precio: 7360,
    });
    expect(serializarProducto(expreso)).not.toHaveProperty("precioBase");
  });

  it("serializa un filtrado con sus datos de café", () => {
    const filtrado = new Filtrado(
      10,
      "Filtrado Pocillo Brasil",
      "Pocillo",
      Variedad.BRASIL,
      6,
    );
    expect(serializarProducto(filtrado)).toMatchObject({
      tipo: "filtrado",
      tamanio: "Pocillo",
      gramosCafe: 6,
      variedad: { nombre: "Brasil" },
      precio: 4040,
    });
    expect(serializarProducto(filtrado)).not.toHaveProperty("precioBase");
  });

  it("serializa una pastelería sin campos de café", () => {
    const pasteleria = new Pasteleria(19, "Muffin de chocolate", 2500);
    const dto = serializarProducto(pasteleria);
    expect(dto).toEqual({
      id: 19,
      tipo: "pasteleria",
      nombre: "Muffin de chocolate",
      precio: 2500,
    });
    expect(dto).not.toHaveProperty("precioBase");
    expect(dto).not.toHaveProperty("tamanio");
    expect(dto).not.toHaveProperty("variedad");
  });
});
