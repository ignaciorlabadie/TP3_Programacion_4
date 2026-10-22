import { Cafe, type Tamano } from "./cafe.js";
import { Variedad } from "./variedad.js";

export class Expreso extends Cafe {
  constructor(id: number, nombre: string, tamano: Tamano, variedad: Variedad, gramos: number) {
    super(id, nombre, 2500, tamano, variedad, gramos);
  }
}
