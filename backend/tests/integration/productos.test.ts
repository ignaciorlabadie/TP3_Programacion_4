import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("GET /productos", () => {
  it("devuelve 200 y los 20 productos", async () => {
    const res = await request(app).get("/productos");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(20);
  });

  it("cada producto trae id, nombre y precio calculado, sin precioBase", async () => {
    const res = await request(app).get("/productos");
    expect(res.body[0]).toMatchObject({
      id: 1,
      nombre: "Expreso Pocillo Brasil",
      tipo: "expreso",
      precio: 5020,
    });
    expect(res.body[0]).not.toHaveProperty("precioBase");
  });

  it("todos los productos traen tipo válido, precio numérico y sin precioBase", async () => {
    const res = await request(app).get("/productos");
    for (const producto of res.body) {
      expect(["expreso", "filtrado", "pasteleria"]).toContain(producto.tipo);
      expect(typeof producto.precio).toBe("number");
      expect(producto).not.toHaveProperty("precioBase");
    }
  });
});

describe("GET /productos/:id", () => {
  it("devuelve el producto pedido", async () => {
    const res = await request(app).get("/productos/1");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      nombre: "Expreso Pocillo Brasil",
      precio: 5020,
    });
  });

  it("devuelve 404 si no existe", async () => {
    const res = await request(app).get("/productos/999");
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({ error: "Producto no encontrado" });
  });

  it.each(["abc", "1.5"])(
    "devuelve 400 y un mensaje si el id '%s' no es un entero",
    async (id) => {
      const res = await request(app).get(`/productos/${id}`);
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Id inválido" });
    },
  );

  it("devuelve un expreso con sus datos completos", async () => {
    const res = await request(app).get("/productos/5");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
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
  });

  it("devuelve un filtrado con sus datos de café", async () => {
    const res = await request(app).get("/productos/10");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      tipo: "filtrado",
      tamanio: "Pocillo",
      gramosCafe: 6,
      variedad: { nombre: "Brasil" },
      precio: 4040,
    });
  });

  it("devuelve una pastelería sin campos de café", async () => {
    const res = await request(app).get("/productos/19");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 19,
      tipo: "pasteleria",
      nombre: "Muffin de chocolate",
      precio: 2500,
    });
  });

  it("los errores responden con { error: string }", async () => {
    for (const ruta of ["/productos/999", "/productos/abc"]) {
      const res = await request(app).get(ruta);
      expect(res.body).toEqual({ error: expect.any(String) });
    }
  });
});
