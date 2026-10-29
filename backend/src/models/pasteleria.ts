import { Producto } from "./producto.js";

export class Pasteleria extends Producto {
  public readonly tipo = "pasteleria";

  constructor(id: number, nombre: string, precioBase: number) {
    super(id, nombre, precioBase);
  }

  calcularPrecio(): number {
    return this.precioBase;
  }
}
