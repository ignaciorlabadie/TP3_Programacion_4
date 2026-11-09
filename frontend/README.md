# Cafetería Origen - Frontend

Menú de mesa para la cafetería Origen. Consume la API del backend y está pensado para usarse desde el celular.

## Stack

- Vite 7 + React 19 + TypeScript (`strict: true`, sin `any`)
- Bootstrap 5 personalizado con SASS
- Zod 4 para validar las respuestas de la API
- Vitest 3 + React Testing Library + user-event + jest-dom
- MSW 2 para los tests de integración
- Playwright para los E2E

## Requisitos

- Node.js 24 o superior
- npm
- La API del backend disponible para desarrollo y E2E

## Instalación

```bash
npm ci
```

Para los E2E, instalar el navegador de Playwright:

```bash
npx playwright install chromium
```

## Ejecución

Levantar la API desde `backend/`:

```bash
cd ../backend
npm ci
npm run dev
```

Luego, desde `frontend/`:

```bash
npm run dev
```

El front queda disponible en http://localhost:5173. El proxy de Vite redirige `/api` a `http://localhost:3000`.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Typecheck + build de producción |
| `npm run preview` | Previsualizar el build |
| `npm run lint` | ESLint |
| `npm test` | Unitarios, componentes e integración |
| `npm run test:watch` | Vitest en modo watch |
| `npm run test:e2e` | E2E con Playwright |

## Tests

`npm test` corre unitarios, componentes e integración sin necesitar la API levantada. MSW intercepta las llamadas HTTP.

`npm run test:e2e` corre Playwright contra la API real. El `webServer` del config levanta automáticamente el backend (`:3000`) y el front (`:5173`); no hace falta levantarlos a mano. Requiere Chromium instalado.

### Niveles:

- `src/test/unit/`: funciones puras (precio, café, orígenes, mesa).
- `src/test/components/`: componentes con React Testing Library.
- `src/test/integration/`: cliente HTTP, menú y confirmación del pedido con MSW.
- `e2e/`: recorridos con Playwright (menú, pedido completo y viewport de 375 px).

**Nota:** Los tests de 500, API caída y seguimiento en `confirmarPedido.test.tsx` son de **regresión**: documentan comportamiento ya implementado y no forman parte de un ciclo rojo-verde.

## Contrato de la API usado por el front

El front centraliza las llamadas HTTP en `src/api/cliente.ts` y valida cada respuesta con Zod (`src/schemas/`). Los tipos se obtienen con `z.infer`.

### `GET /productos`

Devuelve el menú completo:

```json
[
  {
    "id": 5,
    "tipo": "expreso",
    "nombre": "Expreso Mediano Colombia",
    "tamanio": "Mediano",
    "gramosCafe": 27,
    "variedad": {
      "nombre": "Colombia",
      "descripcion": "Acidez media, cuerpo equilibrado y notas cítricas y florales"
    },
    "precio": 7360
  },
  {
    "id": 19,
    "tipo": "pasteleria",
    "nombre": "Muffin de chocolate",
    "precio": 2500
  }
]
```

### `GET /productos/:id`

Devuelve un producto con el mismo formato, o un error.

Reglas del contrato:

- `tipo`: `expreso`, `filtrado` o `pasteleria`.
- `tamanio`: `Pocillo`, `Mediano` o `Taza grande`.
- `variedad.nombre`: `Brasil`, `Colombia` o `Etiopia` (sin tilde).
- `precio` viene calculado por la API. El front no calcula precios ni el total del pedido; el subtotal del carrito es solo orientativo.
- `GET /productos/abc` responde `400 { "error": "Id inválido" }`.
- `GET /productos/999` responde `404 { "error": "Producto no encontrado" }`.

### Mesa desde el QR

El menú se abre con `?mesa=N`. El valor debe ser un entero entre 1 y 10:

- `/?mesa=4` → muestra `Mesa 4`.
- Sin `?mesa`, con un formato inválido o fuera del catálogo (por ejemplo `/?mesa=999`) → muestra `Retirar en la barra` y no envía `mesaId`.

### `POST /pedidos`

Crea el pedido con la mesa (opcional) y los items del carrito:

```json
{
  "mesaId": 4,
  "items": [
    { "productoId": 5, "cantidad": 2 },
    { "productoId": 19, "cantidad": 1 }
  ]
}
```

- `mesaId` es opcional: se omite cuando el pedido es para retirar en la barra.
- El front no calcula precios ni el total: los toma de la respuesta.

Respuesta `201`:

```json
{
  "id": 1,
  "mesaId": 4,
  "items": [
    { "productoId": 5, "cantidad": 2 },
    { "productoId": 19, "cantidad": 1 }
  ],
  "estado": "pendiente",
  "total": 17220
}
```

### `GET /pedidos/:id`

Devuelve el pedido con el mismo formato que `POST /pedidos`. Se usa para el seguimiento sin recargar la página. Si el pedido no existe responde `404 { "error": "Pedido no encontrado" }`.

### Errores

Todas las respuestas de error usan:

```json
{ "error": "mensaje" }
```

Si la respuesta no cumple el contrato de Zod, el front muestra un error de contrato.

## Estructura

```
src/
  api/          # cliente HTTP único
  components/   # SelectorCafe, Pasteleria, MenuProductos, EncabezadoMesa, Carrito, ConfirmacionPedido
  context/      # CarritoContext con useReducer
  domain/       # reglas puras: café, precios, mesa, carrito y armado del pedido
  schemas/      # contratos Zod (productos y pedidos)
  styles/       # Bootstrap personalizado con SASS
  test/         # unit, components, integration, MSW
e2e/            # Playwright
```
