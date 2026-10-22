import { pedidoService } from "./pedido.service.js";

export class ReportesService {
    facturacionTotal(): number { return pedidoService.facturacionTotal();}
    productoMasVendido():  { nombre: string; cantidad: number } | null { return pedidoService.productoMasVendido(); }
}
export const reportesService = new ReportesService();
