import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import productosRouter from "./routes/productos.js";
import pedidosRouter from "./routes/pedidos.js";
import reportesRouter from "./routes/reportes.js";

interface ErrorConEstado extends Error {
  status?: number;
  statusCode?: number;
  type?: string;
}

function estadoDeError(error: ErrorConEstado): number {
  if (typeof error.status === "number") {
    return error.status;
  }
  if (typeof error.statusCode === "number") {
    return error.statusCode;
  }
  return 500;
}

const manejadorErrores: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const errorConEstado = error as ErrorConEstado;
  const status = estadoDeError(errorConEstado);
  const esJsonInvalido = errorConEstado.type === "entity.parse.failed";

  const mensaje = esJsonInvalido
    ? "JSON inválido"
    : status >= 500
      ? "Error interno del servidor"
      : errorConEstado.message || "Solicitud inválida";

  res.status(status).json({ error: mensaje });
};

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());
app.use("/productos", productosRouter);
app.use("/pedidos", pedidosRouter);
app.use("/reportes", reportesRouter);

app.get("/", (_req, res) => {
  res.status(200).json({
    mensaje: "API de Cafetería Origen",
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.use(manejadorErrores);

export default app;
