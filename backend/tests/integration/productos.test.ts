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
});
