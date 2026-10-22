import { describe, it, expect } from "vitest";
import { PedidoService } from "../../src/services/pedido.service.js";
import request from "supertest";
import app from "../../src/app.js";
import { PedidoRepository } from "../../src/repositories/pedido.repository.js";

const service = new PedidoService(new PedidoRepository());

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
}); 

describe("GET /pedidos/:id", () => {
  it("devuelve el pedido creado", async () => {
    const creado = await request(app).post("/pedidos").send({ items: [{ productoId: 10, cantidad: 3 }] });
    const res = await request(app).get(`/pedidos/${creado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(3 * 4040); // 12120
  });

  it("devuelve 404 si no existe", async () => {
    const res = await request(app).get("/pedidos/999");
    expect(res.status).toBe(404);
  });
});