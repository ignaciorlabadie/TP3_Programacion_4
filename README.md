# Cafetería Origen - Grupo 9

TP3 de Programación IV (TUP, UTN FRBB): menú de mesa para la cafetería Origen. El cliente escanea un QR, arma su pedido desde el celular y lo envía a la API.

## Estructura

- `backend/`: API REST con Express + TypeScript.
- `frontend/`: menú con Vite + React + TypeScript.
- `docker-compose.yml`: API y front containerizados.

## Requisitos

- Node.js 24 o superior
- npm
- Docker (opcional, para la ejecución containerizada)

## Ejecución local

### API

```bash
cd backend
npm ci
npm run dev
```

La API queda disponible en http://localhost:3000.

### Frontend

En otra terminal:

```bash
cd frontend
npm ci
npm run dev
```

El front queda disponible en http://localhost:5173. Las llamadas a `/api` se redirigen a `http://localhost:3000` mediante el proxy de Vite.

## Ejecución con Docker

```bash
docker compose up --build
```

- Front: http://localhost
- API: http://localhost:3000

El contenedor del front usa Nginx y redirige `/api` al backend.

## Tests

```bash
# API
cd backend
npm test

# Frontend: unitarios, componentes e integración (sin API levantada)
cd frontend
npm test

# Frontend: E2E con API real (requiere Chromium)
cd frontend
npx playwright install chromium
npm run test:e2e
```

También se puede ejecutar:

```bash
cd frontend
npm run lint
npm run build
```

Los E2E levantan la API y el front automáticamente mediante el `webServer` de Playwright.

## Documentación

- [Contrato y endpoints del backend](./backend/README.md)
- [Contrato que consume el frontend](./frontend/README.md)

## Integrantes

- Franco, Adrián Emmanuel
- Foricher Castellón, Juan
- Ramirez Labadie, Ignacio
- Stallone, Ramiro
