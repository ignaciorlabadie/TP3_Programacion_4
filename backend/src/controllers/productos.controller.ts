import type { Request, Response } from "express";
import type { Producto } from "../models/producto.js";
import { productoService } from "../services/producto.service.js";

export interface ProductoDTO {
  id: number;
  nombre: string;
  precioBase: number;
  precio: number;
}

export function serializarProducto(producto: Producto): ProductoDTO {
  return {
    id: producto.id,
    nombre: producto.nombre,
    precioBase: producto.precioBase,
    precio: producto.calcularPrecio(),
  };
}

export function listarProductos(_req: Request, res: Response): void {
  res.json(productoService.listar().map(serializarProducto));
}

export function obtenerProducto(req: Request, res: Response): void {
  const producto = productoService.obtenerPorId(Number(req.params.id));
  if (!producto) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  res.json(serializarProducto(producto));
}
