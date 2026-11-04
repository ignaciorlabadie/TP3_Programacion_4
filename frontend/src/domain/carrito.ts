export type ItemCarrito = {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

export type AccionCarrito =
  | { type: 'AGREGAR'; payload: { productoId: number; nombre: string; precio: number } }
  | { type: 'SUMAR'; payload: { productoId: number } }
  | { type: 'RESTAR'; payload: { productoId: number } }
  | { type: 'QUITAR'; payload: { productoId: number } };

export function carritoReducer(state: ItemCarrito[], action: AccionCarrito): ItemCarrito[] {
  switch (action.type) {
    case 'AGREGAR': {
      const { productoId, nombre, precio } = action.payload;
      const existente = state.find((item) => item.productoId === productoId);
      if (existente) {
        return state.map((item) =>
          item.productoId === productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...state, { productoId, nombre, precio, cantidad: 1 }];
    }

    case 'SUMAR': {
      return state.map((item) =>
        item.productoId === action.payload.productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    }

    case 'RESTAR': {
      return state
        .map((item) =>
          item.productoId === action.payload.productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0);
    }

    case 'QUITAR': {
      return state.filter((item) => item.productoId !== action.payload.productoId);
    }

    default:
      return state;
  }
}

export function calcularSubtotal(items: ItemCarrito[]): number {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}
