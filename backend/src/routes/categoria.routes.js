import { Router } from "express";
import verificarAutenticacion from "../middlewares/autenticacion.js";
import { esAdminRole } from "../middlewares/validar_rol.js";
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaPorId, obtenerCategorias } from "../controllers/categoria.controller.js";


const router = Router();

router.get('/', obtenerCategorias);
router.get('/:id', obtenerCategoriaPorId);
router.post('/', [verificarAutenticacion, esAdminRole], crearCategoria);
router.put('/:id', [verificarAutenticacion, esAdminRole], actualizarCategoria);
router.delete('/:id', [verificarAutenticacion, esAdminRole], eliminarCategoria);

export default router;