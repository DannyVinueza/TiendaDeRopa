import { Router } from "express";
import verificarAutenticacion from "../middlewares/autenticacion.js";
import { esClienteRole } from "../middlewares/validar_rol.js";
import { explorarProductos, sugerencias, verDetalleProducto } from "../controllers/cliente.controller.js";

const router = Router();

router.get('/explorar', verificarAutenticacion, esClienteRole, explorarProductos);
router.get('/producto/:id', verificarAutenticacion, esClienteRole, verDetalleProducto);
router.get('/sugerencias', verificarAutenticacion, esClienteRole, sugerencias);

export default router;