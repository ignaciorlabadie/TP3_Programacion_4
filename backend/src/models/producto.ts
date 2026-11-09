export type TipoProducto = "expreso" | "filtrado" | "pasteleria";

export abstract class Producto {
  abstract readonly tipo: TipoProducto;

  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly precioBase: number,
  ) {}

  abstract calcularPrecio(): number;
}
