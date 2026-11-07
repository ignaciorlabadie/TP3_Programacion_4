import { describe, it, expect, beforeEach } from "vitest";
import { PedidoService } from "../../src/services/pedido.service.js";
import request from "supertest";
import app from "../../src/app.js";
import { PedidoRepository } from "../../src/repositories/pedido.repository.js";

const service = new PedidoService(new PedidoRepository());

const itemsSeed = [
  { productoId: 5, cantidad: 2 },
  { productoId: 19, cantidad: 1 },
];

beforeEach(async () => {
  await request(app).post("/__test__/reset");
});

describe("PedidoService", () => {
  it("facturacionTotal suma los totales de todos los pedidos", () => {
    service.crearPedido([{ productoId: 1, cantidad: 2 }]);
    service.crearPedido([{ productoId: 20, cantidad: 1 }]); 
    expect(service.facturacionTotal()).toBe(14240);
  });
});

describe("POST /pedidos", () => {
  it("devuelve 201 con el pedido y su total calculado", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ items: [{ productoId: 1, cantidad: 2 }, { productoId: 19, cantidad: 1 }] });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ estado: "pendiente", total: 12540 });
  });

  it("acepta mesaId y lo devuelve en el pedido", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ mesaId: 4, items: itemsSeed });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      mesaId: 4,
      estado: "pendiente",
      total: 17220,
      items: itemsSeed,
    });
  });

  it("acepta un pedido sin mesa", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ items: [{ productoId: 1, cantidad: 1 }] });

    expect(res.status).toBe(201);
    expect(res.body).not.toHaveProperty("mesaId");
  });

  it("acepta mesaId null como pedido sin mesa", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ mesaId: null, items: [{ productoId: 1, cantidad: 1 }] });

    expect(res.status).toBe(201);
    expect(res.body).not.toHaveProperty("mesaId");
  });

  it("ignora el estado enviado por el cliente", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ estado: "completado", items: [{ productoId: 1, cantidad: 1 }] });

    expect(res.status).toBe(201);
    expect(res.body.estado).toBe("pendiente");
  });

  it.each([0, -1, 1.5, "4"])(
    "rechaza el mesaId inválido '%s'",
    async (mesaId) => {
      const res = await request(app)
        .post("/pedidos")
        .send({ mesaId, items: [{ productoId: 1, cantidad: 1 }] });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Mesa inválida" });
    },
  );

  it.each([1, 10])("acepta la mesa existente %i", async (mesaId) => {
    const res = await request(app)
      .post("/pedidos")
      .send({ mesaId, items: itemsSeed });

    expect(res.status).toBe(201);
    expect(res.body.mesaId).toBe(mesaId);
  });

  it("rechaza una mesa inexistente", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ mesaId: 999, items: itemsSeed });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Mesa inexistente" });
  });
});

describe("Validación de items", () => {
  it("rechaza un pedido sin items", async () => {
    const res = await request(app).post("/pedidos").send({ items: [] });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "El pedido debe tener al menos un item" });
  });

  it("rechaza un item que no es un objeto", async () => {
    const res = await request(app).post("/pedidos").send({ items: [null] });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Item inválido" });
  });

  it.each([0, -1, 1.5, "2"])(
    "rechaza la cantidad inválida '%s'",
    async (cantidad) => {
      const res = await request(app)
        .post("/pedidos")
        .send({ items: [{ productoId: 1, cantidad }] });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        error: "La cantidad debe ser un numero entero mayor a 0",
      });
    },
  );

  it("rechaza un producto inexistente", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ items: [{ productoId: 999, cantidad: 1 }] });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Producto no encontrado" });
  });
});

describe("GET /pedidos/:id", () => {
  it("devuelve el pedido creado", async () => {
    const creado = await request(app).post("/pedidos").send({ items: [{ productoId: 10, cantidad: 3 }] });
    const res = await request(app).get(`/pedidos/${creado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(3 * 4040); // 12120
  });

  it("devuelve el pedido con estado, items, total y mesaId", async () => {
    const creado = await request(app)
      .post("/pedidos")
      .send({ mesaId: 4, items: itemsSeed });

    const res = await request(app).get(`/pedidos/${creado.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: creado.body.id,
      mesaId: 4,
      items: itemsSeed,
      estado: "pendiente",
      total: 17220,
    });
  });

  it("devuelve 404 si no existe", async () => {
    const res = await request(app).get("/pedidos/999");
    expect(res.status).toBe(404);
  });
});