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
| GET    | `/productos`            | Listar productos          |
| GET    | `/productos/:id`        | Obtener producto por ID   |
| GET    | `/pedidos`              | Obtener todos los pedidos |
| GET    | `/pedidos/:id`          | Obtener un pedido por ID  |
| POST   | `/pedidos`              | Crear un pedido           |
| GET    | `/reportes/facturacion` | Facturación               |
| GET    | `/reportes/mas-vendido` | Producto más vendido      |

## Tests

```bash
npm test
```

## Integrantes

- Franco, Adrián Emmanuel
- Foricher Castellón, Juan
- Ramirez Labadie, Ignacio
- Stallone, Ramiro
