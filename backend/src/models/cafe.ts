import { Producto } from "./producto.js";
import { type Variedad, precioPorGramo } from "./variedad.js";

export type Tamano = "Pocillo" | "Mediano" | "Taza grande";

export abstract class Cafe extends Producto {
  constructor(
    id: number,
    nombre: string,
    precioBase: number,
    public readonly tamano: Tamano,
    public readonly variedad: Variedad,
    public readonly gramos: number,
  ) {
    super(id, nombre, precioBase);
  }

  calcularPrecio(): number {
    return this.precioBase + this.gramos * precioPorGramo(this.variedad);
  }
}
