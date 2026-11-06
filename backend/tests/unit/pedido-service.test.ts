import { describe, it, expect, vi } from "vitest";
import { PedidoService } from "../../src/services/pedido.service.js";
import { PedidoRepository } from "../../src/repositories/pedido.repository.js";

const mesas = { existe: vi.fn((id: number) => id >= 1 && id <= 10) };
const service = new PedidoService(new PedidoRepository(), mesas);

describe("PedidoService - mesas", () => {
    it("delega la existencia de la mesa al repositorio", () => {
        const pedido = service.crearPedido(
            [{ productoId: 1, cantidad: 1 }],
            undefined,
            5,
        );

        expect(pedido.mesaId).toBe(5);
        expect(mesas.existe).toHaveBeenCalledWith(5);
    });

    it("rechaza una mesa inexistente", () => {
        expect(() =>
            service.crearPedido([{ productoId: 1, cantidad: 1 }], undefined, 999),
        ).toThrow("Mesa inexistente");
    });
});
