import express from "express";
import cors from "cors";
import productosRouter from "./routes/productos.js";
import pedidosRouter from "./routes/pedidos.js";
import reportesRouter from "./routes/reportes.js";

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

export default app;
