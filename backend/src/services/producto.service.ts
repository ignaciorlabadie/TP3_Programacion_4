import type { Producto } from "../models/producto.js";
import { ProductoRepository, productoRepository } from "../repositories/producto.repository.js";

export class ProductoService {
  constructor(private readonly repository: ProductoRepository = productoRepository) {}

  listar(): Producto[] {
    return this.repository.getAll();
  }

  obtenerPorId(id: number): Producto | undefined {
    return this.repository.getById(id);
  }
}

export const productoService = new ProductoService();
