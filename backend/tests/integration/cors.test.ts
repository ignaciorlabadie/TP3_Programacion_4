import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

const ORIGEN_FRONT = "http://localhost:5173";

describe("CORS", () => {
  it("permite el origen del front en una petición simple", async () => {
    const res = await request(app)
      .get("/productos")
      .set("Origin", ORIGEN_FRONT);

    expect(res.status).toBe(200);
    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });

  it("responde el preflight con el método y los headers solicitados", async () => {
    const res = await request(app)
      .options("/pedidos")
      .set("Origin", ORIGEN_FRONT)
      .set("Access-Control-Request-Method", "POST")
      .set("Access-Control-Request-Headers", "content-type");

    expect(res.status).toBe(204);
    expect(res.headers["access-control-allow-origin"]).toBe("*");
    expect(res.headers["access-control-allow-methods"]).toContain("POST");
    expect(res.headers["access-control-allow-headers"]).toContain(
      "content-type",
    );
  });
});
