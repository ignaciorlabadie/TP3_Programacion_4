# Cafetería Origen

API para la gestión de pedidos de una cafetería.

## Tecnologías

- Node.js
- TypeScript
- Express
- Vitest

## Instalación

```bash
git clone https://github.com/ignaciorlabadie/CafeteriaOrigen_Backend_Grupo9.git
cd CafeteriaOrigen_Backend_Grupo9
npm ci
```

## Ejecución

```bash
npm run dev
```

Servidor en http://localhost:3000

## Endpoints

| Método | Endpoint                | Descripción               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/`                     | Información de la API     |
| GET    | `/productos`            | Listar productos (con `precio` y `tipo`)          |
| GET    | `/productos/:id`        | Obtener producto por ID (400/404 con `{ error }`) |
| GET    | `/pedidos`              | Obtener todos los pedidos |
| GET    | `/pedidos/:id`          | Obtener un pedido por ID  |
| POST   | `/pedidos`              | Crear un pedido           |
| GET    | `/reportes/facturacion` | Facturación               |
| GET    | `/reportes/mas-vendido` | Producto más vendido      |

### Productos

`GET /productos` devuelve el menú completo y `GET /productos/:id` un producto puntual.
Cada producto incluye `precio` ya calculado y `tipo` (`expreso`, `filtrado` o
`pasteleria`). Los cafés agregan `tamanio`, `gramosCafe` y la variedad con su
descripción.

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

**Errores**

- `GET /productos/999` → `404 { "error": "Producto no encontrado" }`
- `GET /productos/abc` → `400 { "error": "Id inválido" }`

La variedad se escribe `Etiopia` (sin tilde) en la API.

## Tests

```bash
npm test
```

## Integrantes

- Franco, Adrián Emmanuel
- Foricher Castellón, Juan
- Ramirez Labadie, Ignacio
- Stallone, Ramiro
