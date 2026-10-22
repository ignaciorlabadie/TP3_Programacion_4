import type { Producto } from "../models/producto.js";
import { Expreso } from "../models/expreso.js";
import { Filtrado } from "../models/filtrado.js";
import { Pasteleria } from "../models/pasteleria.js";
import { Variedad } from "../models/variedad.js";

export function crearMenu(): Producto[] {
  return [
    new Expreso(1, "Expreso Pocillo Brasil", "Pocillo", Variedad.BRASIL, 18),
    new Expreso(2, "Expreso Pocillo Colombia", "Pocillo", Variedad.COLOMBIA, 18),
    new Expreso(3, "Expreso Pocillo Etiopia", "Pocillo", Variedad.ETIOPIA, 18),
    new Expreso(4, "Expreso Mediano Brasil", "Mediano", Variedad.BRASIL, 27),
    new Expreso(5, "Expreso Mediano Colombia", "Mediano", Variedad.COLOMBIA, 27),
    new Expreso(6, "Expreso Mediano Etiopia", "Mediano", Variedad.ETIOPIA, 27),
    new Expreso(7, "Expreso Taza grande Brasil", "Taza grande", Variedad.BRASIL, 36),
    new Expreso(8, "Expreso Taza grande Colombia", "Taza grande", Variedad.COLOMBIA, 36),
    new Expreso(9, "Expreso Taza grande Etiopia", "Taza grande", Variedad.ETIOPIA, 36),
    new Filtrado(10, "Filtrado Pocillo Brasil", "Pocillo", Variedad.BRASIL, 6),
    new Filtrado(11, "Filtrado Pocillo Colombia", "Pocillo", Variedad.COLOMBIA, 6),
    new Filtrado(12, "Filtrado Pocillo Etiopia", "Pocillo", Variedad.ETIOPIA, 6),
    new Filtrado(13, "Filtrado Mediano Brasil", "Mediano", Variedad.BRASIL, 15),
    new Filtrado(14, "Filtrado Mediano Colombia", "Mediano", Variedad.COLOMBIA, 15),
    new Filtrado(15, "Filtrado Mediano Etiopia", "Mediano", Variedad.ETIOPIA, 15),
    new Filtrado(16, "Filtrado Taza grande Brasil", "Taza grande", Variedad.BRASIL, 25),
    new Filtrado(17, "Filtrado Taza grande Colombia", "Taza grande", Variedad.COLOMBIA, 25),
    new Filtrado(18, "Filtrado Taza grande Etiopia", "Taza grande", Variedad.ETIOPIA, 25),
    new Pasteleria(19, "Muffin de chocolate", 2500),
    new Pasteleria(20, "Torta selva negra", 4200),
  ];
}
