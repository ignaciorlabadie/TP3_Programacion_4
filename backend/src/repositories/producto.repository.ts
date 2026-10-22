import type { Producto } from "../models/producto.js";
import { crearMenu } from "./menu.js";

export class ProductoRepository {
  private readonly productos: Producto[] = crearMenu();

  getAll(): Producto[] {
    return [...this.productos];
  }

  getById(id: number): Producto | undefined {
    return this.productos.find((producto) => producto.id === id);
  }
}

export const productoRepository = new ProductoRepository();
