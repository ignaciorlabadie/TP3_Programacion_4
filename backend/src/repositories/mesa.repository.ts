export interface RepositorioMesas {
  existe(id: number): boolean;
}

export class MesaRepository implements RepositorioMesas {
  private readonly mesas = new Set<number>(
    Array.from({ length: 10 }, (_, i) => i + 1),
  );

  existe(id: number): boolean {
    return this.mesas.has(id);
  }
}

export const mesaRepository = new MesaRepository();