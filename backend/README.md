# Cafetería Origen - API

API REST para el menú y los pedidos de la cafetería Origen.

## Tecnologías

- Node.js 24 o superior
- TypeScript
- Express 5
- CORS
- Vitest + Supertest

## Instalación

```bash
cd backend
npm ci
```

## Ejecución

```bash
npm run dev
```

La API queda disponible en http://localhost:3000.

Build y ejecución de producción:

```bash
npm run build
npm start
```

## Tests

```bash
npm test
```

Para el reporte de cobertura:

```bash
npm run coverage
```

## Endpoints

| Método | Endpoint                | Descripción                                      |
| ------ | ----------------------- | ------------------------------------------------ |
| GET    | `/`                     | Información de la API                            |
| GET    | `/productos`            | Listar productos (con `precio` y `tipo`)         |
| GET    | `/productos/:id`        | Obtener producto por ID (400/404 con `{ error }`) |
| GET    | `/pedidos`              | Obtener todos los pedidos                        |
| GET    | `/pedidos/:id`          | Obtener un pedido por ID                         |
| POST   | `/pedidos`              | Crear un pedido                                  |
| GET    | `/reportes/facturacion` | Facturación                                      |
| GET    | `/reportes/mas-vendido` | Producto más vendido                             |

El front consume la API mediante el prefijo `/api`, que Vite redirige en desarrollo y Nginx en Docker. CORS está habilitado y se puede restringir con la variable `CORS_ORIGIN`.

## Productos

`GET /productos` devuelve el menú completo y `GET /productos/:id` un producto puntual. Cada producto incluye `precio` ya calculado y `tipo` (`expreso`, `filtrado` o `pasteleria`). Los cafés agregan `tamanio`, `gramosCafe` y la variedad con su descripción.

```json
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
}
```

```json
{
  "id": 19,
  "tipo": "pasteleria",
  "nombre": "Muffin de chocolate",
  "precio": 2500
}
```

La variedad se escribe `Etiopia` (sin tilde) en la API.

**Errores**

- `GET /productos/999` → `404 { "error": "Producto no encontrado" }`
- `GET /productos/abc` → `400 { "error": "Id inválido" }`

## Pedidos

`POST /pedidos` recibe los items del pedido y responde `201` con el pedido en estado `pendiente` y su total calculado por la API.

```json
{
  "items": [
    { "productoId": 5, "cantidad": 2 },
    { "productoId": 19, "cantidad": 1 }
  ]
}
```

`GET /pedidos/:id` devuelve el pedido con su estado, sus items y su total. Si el pedido no existe responde `404 { "error": "Pedido no encontrado" }`.

COMPLETAR: agregar `mesaId` opcional a `POST /pedidos` y devolverlo en el pedido.

COMPLETAR: documentar el formato final de `GET /pedidos/:id` con estado, items y total para el seguimiento desde el front.

## Errores

Todas las respuestas de error usan el formato:

```json
{ "error": "mensaje" }
```

Una mesa o un producto inexistente deben responder `400` o `404`, nunca `500`.

## Test helpers (COMPLETAR)

Con `NODE_ENV=test` deben existir:

- `POST /__test__/reset`
- `POST /__test__/seed`

COMPLETAR: implementar y documentar ambos endpoints para que los E2E arranquen siempre con los mismos datos.

## Integrantes

- Franco, Adrián Emmanuel
- Foricher Castellón, Juan
- Ramirez Labadie, Ignacio
- Stallone, Ramiro
