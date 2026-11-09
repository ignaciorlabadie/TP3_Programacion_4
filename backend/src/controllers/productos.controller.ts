import type { Request, Response } from "express";
import { Cafe, type Tamano } from "../models/cafe.js";
import type { Producto } from "../models/producto.js";
import { descripcionVariedad } from "../models/variedad.js";
import { productoService } from "../services/producto.service.js";

export interface VariedadDTO {
  nombre: string;
  descripcion: string;
}

export interface ProductoDTOCafe {
  id: number;
  tipo: "expreso" | "filtrado";
  nombre: string;
  tamanio: Tamano;
  gramosCafe: number;
  variedad: VariedadDTO;
  precio: number;
}

export interface ProductoDTOPasteleria {
  id: number;
  tipo: "pasteleria";
  nombre: string;
  precio: number;
}

export type ProductoDTO = ProductoDTOCafe | ProductoDTOPasteleria;

export function serializarProducto(producto: Producto): ProductoDTO {
  const base = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.calcularPrecio(),
  };

  if (producto instanceof Cafe) {
    return {
      ...base,
      tipo: producto.tipo,
      tamanio: producto.tamano,
      gramosCafe: producto.gramos,
      variedad: {
        nombre: producto.variedad,
        descripcion: descripcionVariedad(producto.variedad),
      },
    };
  }

  return { ...base, tipo: "pasteleria" };
}

export function listarProductos(_req: Request, res: Response): void {
  res.json(productoService.listar().map(serializarProducto));
}

export function obtenerProducto(req: Request, res: Response): void {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Id inválido" });
    return;
  }

  const producto = productoService.obtenerPorId(id);
  if (!producto) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  res.json(serializarProducto(producto));
}
