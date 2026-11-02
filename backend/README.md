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

`POST /pedidos` recibe la mesa (opcional) y los items del pedido. La API calcula el total, crea el pedido en estado `pendiente` y responde `201`.

```json
{
  "mesaId": 4,
  "items": [
    { "productoId": 5, "cantidad": 2 },
    { "productoId": 19, "cantidad": 1 }
  ]
}
```

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

`mesaId` es opcional y debe ser un entero positivo. Si se omite o se envía `null`, el pedido se crea sin mesa y la clave `mesaId` no aparece en la respuesta. Un `mesaId` inválido responde `400 { "error": "Mesa inválida" }`.

El `estado` que envíe el cliente se ignora: la API siempre crea el pedido en `pendiente`.

`GET /pedidos/:id` devuelve el pedido con su estado, sus items, su total y su mesa (si tiene). Si el pedido no existe responde `404 { "error": "Pedido no encontrado" }`.

**Errores**

- `mesaId` inválido → `400 { "error": "Mesa inválida" }`
- Pedido sin items → `400 { "error": "El pedido debe tener al menos un item" }`
- Item inválido → `400 { "error": "Item inválido" }`
- Cantidad inválida → `400 { "error": "La cantidad debe ser un numero entero mayor a 0" }`
- Producto inexistente → `400 { "error": "Producto no encontrado" }`

## Errores

Todas las respuestas de error usan el formato:

```json
{ "error": "mensaje" }
```

Una mesa o un producto inexistente deben responder `400` o `404`, nunca `500`.

## Test helpers

Con `NODE_ENV=test` la API expone:

| Método | Endpoint             | Respuesta                                                        |
| ------ | -------------------- | ---------------------------------------------------------------- |
| POST   | `/__test__/reset`    | `204` sin body. Limpia los pedidos y reinicia el contador de ids. |
| POST   | `/__test__/seed`     | `201` con `{ "created": [pedido] }`. Crea el pedido de prueba.    |

El pedido sembrado es el de la mesa 4 con dos expresos medianos de Colombia y un muffin: id `1`, estado `pendiente` y total `17220`. El orden esperado es `reset` y después `seed`, para que los E2E arranquen siempre con los mismos datos.

Fuera de `NODE_ENV=test` los endpoints no existen y responden `404 { "error": "Recurso no encontrado" }` como cualquier ruta inexistente.

## Integrantes

- Franco, Adrián Emmanuel
- Foricher Castellón, Juan
- Ramirez Labadie, Ignacio
- Stallone, Ramiro
