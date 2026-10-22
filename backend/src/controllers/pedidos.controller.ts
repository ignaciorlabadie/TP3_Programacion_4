import type { Request, Response } from "express";
import type { Pedido } from "../models/pedido.js";
import { pedidoService } from "../services/pedido.service.js";

function serializar(pedido: Pedido, total: number) {
  return { id: pedido.id, items: pedido.items, estado: pedido.estado, total };
}

export function crearPedido(req: Request, res: Response): void {
  try {
    const { items, estado } = req.body ?? {};
    const pedido = pedidoService.crearPedido(items, estado);
    res.status(201).json(serializar(pedido, pedidoService.totalPedido(pedido)));
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
}

export function listarPedidos(_req: Request, res: Response): void {
  res.json(
    pedidoService
      .listar()
      .map((pedido) => serializar(pedido, pedidoService.totalPedido(pedido))),
  );
}

export function obtenerPedido(req: Request, res: Response): void {
  const pedido = pedidoService.obtenerPorId(Number(req.params.id));
  if (!pedido) {
    res.status(404).json({ error: "Pedido no encontrado" });
    return;
  }
  res.json(serializar(pedido, pedidoService.totalPedido(pedido)));
}