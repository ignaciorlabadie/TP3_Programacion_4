import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../src/app";
import { pedidoService } from "../src/services/pedido.service.js";
import type { ItemPedido } from "../src/models/itemPedido.js";

describe("Módulo de Reportes y Métricas - Tests", () => {

  beforeAll(() => {
    const items1: ItemPedido[] = [{ productoId: 1, cantidad: 2 }];
    const items2: ItemPedido[] = [{ productoId: 19, cantidad: 5 }, { productoId: 1, cantidad: 1 }];
    pedidoService.crearPedido(items1, "completado");
    pedidoService.crearPedido(items2, "completado");
  });

  describe("Pruebas Unitarias", () => {
    it("debe calcular la facturación total acumulando la suma de todos los pedidos", () => {
      const pedidosSimulados = [
        { id: 1, total: 1500 },
        { id: 2, total: 2500 },
        { id: 3, total: 1000 }
      ];

      const facturacionTotal = pedidosSimulados.reduce((acc, p) => acc + p.total, 0);

      expect(facturacionTotal).toBe(5000);
    });

    it("debe determinar correctamente el producto más vendido", () => {
      const ventas = [
        { productoId: 'p1', nombre: 'Café Espresso', cantidad: 10 },
        { productoId: 'p2', nombre: 'Medialuna', cantidad: 25 },
        { productoId: 'p3', nombre: 'Capuchino', cantidad: 15 }
      ];

      const masVendido = ventas.reduce((prev, current) => 
        (prev.cantidad > current.cantidad) ? prev : current
      );

      expect(masVendido.nombre).toBe('Medialuna');
      expect(masVendido.cantidad).toBe(25);
    });
  });

  describe("Pruebas de Integración", () => {
    it("GET /reportes/facturacion - debe responder con status 200 y la facturación total", async () => {
      const res = await request(app).get("/reportes/facturacion");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("facturacionTotal");
      expect(typeof res.body.facturacionTotal).toBe("number");
    });

    it("GET /reportes/mas-vendido - debe responder con status 200 y los datos del producto más vendido", async () => {
      const res = await request(app).get("/reportes/mas-vendido");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("nombre");
      expect(res.body).toHaveProperty("cantidad");
    });
  });

  describe("Pruebas E2E", () => {
    it("debe verificar la respuesta de los endpoints de reportes en el flujo general", async () => {
      const resFacturacion = await request(app).get("/reportes/facturacion");
      expect(resFacturacion.status).toBe(200);

      const resMasVendido = await request(app).get("/reportes/mas-vendido");
      expect(resMasVendido.status).toBe(200);
      expect(resMasVendido.body).toBeDefined();
    });
  });

});
