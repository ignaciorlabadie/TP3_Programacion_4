import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

describe("Errores globales", () => {
  it("devuelve 404 con formato error para ruta inexistente", async () => {
    const res = await request(app).get("/ruta-inexistente");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Recurso no encontrado" });
  });

  it("devuelve 400 con formato error para JSON inválido", async () => {
    const res = await request(app)
      .post("/productos")
      .set("Content-Type", "application/json")
      .send("{ esto no es json");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "JSON inválido" });
  });

  it("sigue respondiendo correctamente las rutas existentes", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ mensaje: "API de Cafetería Origen" });
  });
});
