import { Router } from "express";
import { facturacion, masVendido } from "../controllers/reportes.controller.js";    

const router = Router();

router.get("/facturacion", facturacion);
router.get("/mas-vendido", masVendido);

export default router; 
