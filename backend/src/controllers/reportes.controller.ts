import type { Request, Response } from "express";
import { reportesService } from "../services/reportes.service.js";

export function facturacion(_req: Request, res: Response): void {
    res.json ({ facturacionTotal: reportesService.facturacionTotal() });
}

export function masVendido(_req: Request, res: Response): void {
    const producto = reportesService.productoMasVendido();
    if (!producto) {
        res.status(404).json({ error: "No hay ventas registradas" });
        return;
    }
    res.json(producto);
}
