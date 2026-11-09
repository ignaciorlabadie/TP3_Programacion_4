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

const DESCRIPCION: Record<Variedad, string> = {
  [Variedad.BRASIL]: "Acidez baja, cuerpo cremoso y notas a chocolate y nuez",
  [Variedad.COLOMBIA]:
    "Acidez media, cuerpo equilibrado y notas cítricas y florales",
  [Variedad.ETIOPIA]: "Acidez alta, cuerpo ligero y notas florales y frutales",
};

export function descripcionVariedad(variedad: Variedad): string {
  return DESCRIPCION[variedad];
}
