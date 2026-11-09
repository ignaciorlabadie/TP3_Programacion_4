import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

const itemsSeed = [
  { productoId: 5, cantidad: 2 },
  { productoId: 19, cantidad: 1 },
];

async function crearPedido() {
  return request(app)
    .post("/pedidos")
    .send({ mesaId: 4, items: itemsSeed });
}

describe("POST /__test__/reset", () => {
  it("responde 204 y deja la lista de pedidos vacía", async () => {
    await crearPedido();

    const reset = await request(app).post("/__test__/reset");
    expect(reset.status).toBe(204);

    const lista = await request(app).get("/pedidos");
    expect(lista.status).toBe(200);
    expect(lista.body).toEqual([]);
  });

  it("reinicia el contador de ids", async () => {
    const primero = await crearPedido();
    expect(primero.status).toBe(201);

    await request(app).post("/__test__/reset");

    const segundo = await crearPedido();
    expect(segundo.status).toBe(201);
    expect(segundo.body.id).toBe(1);
  });
});

describe("POST /__test__/seed", () => {
  beforeEach(async () => {
    await request(app).post("/__test__/reset");
  });

  it("responde 201 con el pedido sembrado", async () => {
    const res = await request(app).post("/__test__/seed");

    expect(res.status).toBe(201);
    expect(res.body.created).toHaveLength(1);
    expect(res.body.created[0]).toEqual({
      id: 1,
      mesaId: 4,
      items: itemsSeed,
      estado: "pendiente",
      total: 17220,
    });
  });

  it("es determinista al repetir reset y seed", async () => {
    const primero = await request(app).post("/__test__/seed");
    expect(primero.status).toBe(201);

    await request(app).post("/__test__/reset");

    const segundo = await request(app).post("/__test__/seed");
    expect(segundo.status).toBe(201);
    expect(segundo.body).toEqual(primero.body);
  });
});
