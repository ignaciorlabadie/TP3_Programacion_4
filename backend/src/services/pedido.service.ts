import type { ItemPedido } from "../models/itemPedido.js";
import type { Pedido } from "../models/pedido.js";
import { PedidoRepository } from "../repositories/pedido.repository.js";
import { productoRepository } from "../repositories/producto.repository.js";

export class PedidoService {
  private readonly productos = productoRepository;

  constructor(private readonly repository: PedidoRepository = new PedidoRepository()) {}

  crearPedido(items: ItemPedido[], estado?: string): Pedido {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("El pedido debe tener al menos un item");
    }
    if (estado !== undefined && typeof estado !== "string") {
      throw new Error("El estado debe ser un texto");
    }
    for (const item of items) {
      if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
        throw new Error("La cantidad debe ser un numero entero mayor a 0");
      }
      if (!this.productos.getById(item.productoId)) {
        throw new Error("Producto no encontrado");
      }
    }
    return this.repository.crear(items, estado ?? "pendiente");
  }

  listar(): Pedido[] {
    return this.repository.getAll();
  }

  obtenerPorId(id: number): Pedido | undefined {
    return this.repository.getById(id);
  }

  totalPedido(pedido: Pedido): number {
    return pedido.items.reduce(
      (total, item) =>
        total +
        (this.productos.getById(item.productoId)?.calcularPrecio() ?? 0) *
          item.cantidad,
      0,
    );
  }

  facturacionTotal(): number {
    return this.pedidosVigentes().reduce(
      (total, pedido) => total + this.totalPedido(pedido),
      0,
    );
  }

  ventasPorProducto(): Record<string, number> {
    const ventas: Record<string, number> = {};
    for (const pedido of this.pedidosVigentes()) {
      for (const item of pedido.items) {
        const producto = this.productos.getById(item.productoId);
        if (!producto) continue;
        ventas[producto.nombre] = (ventas[producto.nombre] ?? 0) + item.cantidad;
      }
    }
    return ventas;
  }

  productoMasVendido(): { nombre: string; cantidad: number } | null {
    let masVendido: { nombre: string; cantidad: number } | null = null;
    for (const [nombre, cantidad] of Object.entries(this.ventasPorProducto())) {
      if (!masVendido || cantidad > masVendido.cantidad) {
        masVendido = { nombre, cantidad };
      }
    }
    return masVendido;
  }

  private pedidosVigentes(): Pedido[] {
    return this.repository
      .getAll()
      .filter((pedido) => pedido.estado.trim().toLowerCase() !== "cancelado");
  }
}


export const pedidoService = new PedidoService();
