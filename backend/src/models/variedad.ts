export enum Variedad {
  BRASIL = "Brasil",
  COLOMBIA = "Colombia",
  ETIOPIA = "Etiopia",
}

const PRECIO_POR_GRAMO: Record<Variedad, number> = {
  [Variedad.BRASIL]: 140,
  [Variedad.COLOMBIA]: 180,
  [Variedad.ETIOPIA]: 240,
};

export function precioPorGramo(variedad: Variedad): number {
  return PRECIO_POR_GRAMO[variedad];
}
