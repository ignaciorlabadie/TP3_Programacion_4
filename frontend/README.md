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

Niveles:

- `src/test/unit/`: funciones puras (precio, café, orígenes, mesa).
- `src/test/components/`: componentes con React Testing Library.
- `src/test/integration/`: cliente HTTP y menú con MSW.
- `e2e/`: recorridos con Playwright (menú y viewport de 375 px).

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
- `precio` viene calculado por la API. El front no calcula precios ni totales.
- `GET /productos/abc` responde `400 { "error": "Id inválido" }`.
- `GET /productos/999` responde `404 { "error": "Producto no encontrado" }`.

### Pedidos (COMPLETAR)

COMPLETAR: documentar el contrato de `POST /pedidos` y `GET /pedidos/:id` cuando se integre el carrito (mesaId opcional, items, estado, total y errores).

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
  components/   # SelectorCafe, Pasteleria, MenuProductos, EncabezadoMesa
  domain/       # reglas puras: café, precios, mesa
  schemas/      # contratos Zod
  styles/       # Bootstrap personalizado con SASS
  test/         # unit, components, integration, MSW
e2e/            # Playwright
```

## Pendientes de integración (COMPLETAR)

- COMPLETAR: integrar `leerMesa` y `EncabezadoMesa` en `App.tsx`.
- COMPLETAR: conectar `onAgregar` con el carrito.
- COMPLETAR: confirmación, seguimiento y errores del pedido.
