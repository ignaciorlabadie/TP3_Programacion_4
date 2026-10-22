import { Router } from "express";
import { crearPedido, listarPedidos, obtenerPedido,} from "../controllers/pedidos.controller.js";

const router = Router();

router.post("/", crearPedido);
router.get("/", listarPedidos);
router.get("/:id", obtenerPedido);

export default router;
