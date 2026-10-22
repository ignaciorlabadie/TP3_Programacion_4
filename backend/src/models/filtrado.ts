import { Cafe, type Tamano } from "./cafe.js";
import { Variedad } from "./variedad.js";

export class Filtrado extends Cafe {
  constructor(id: number, nombre: string, tamano: Tamano, variedad: Variedad, gramos: number) {
    super(id, nombre, 3200, tamano, variedad, gramos);
  }
}
