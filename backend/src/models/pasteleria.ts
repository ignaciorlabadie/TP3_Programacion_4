import { Producto } from "./producto.js";

export class Pasteleria extends Producto {
  calcularPrecio(): number {
    return this.precioBase;
  }
}
