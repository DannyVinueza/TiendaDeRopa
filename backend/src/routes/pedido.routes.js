import { Router } from "express";
import verificarAutenticacion from "../middlewares/autenticacion.js";
import { esClienteRole, esVendedorOAdministrador } from "../middlewares/validar_rol.js";
import { crearPedido, obtenerPedidosCliente, obtenerTodosLosPedidos } from "../controllers/pedido.controller.js";

const router = Router();

// Crear pedido - Solo clientes
router.post('/', verificarAutenticacion, esClienteRole, crearPedido);

// Obtener pedidos del cliente autenticado
router.get('/mios', verificarAutenticacion, esClienteRole, obtenerPedidosCliente);

// Obtener todos los pedidos - Solo vendedor y admin
router.get('/', verificarAutenticacion, esVendedorOAdministrador, obtenerTodosLosPedidos);

export default router;