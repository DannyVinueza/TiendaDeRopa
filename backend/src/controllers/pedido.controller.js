import Cliente from "../models/Cliente.model.js";
import DetallePedido from "../models/DetallePedido.model.js";
import Pago from "../models/Pago.model.js";
import Pedido from "../models/Pedido.model.js";
import Producto from "../models/Producto.model.js";
import { categorizarCliente, generarFactura } from "./vendedor.controller.js";

export const crearPedido = async (req, res) => {
    try {
        const { clienteId, productos, metodoPago } = req.body;

        if (!productos || productos.length === 0) {
            return res.status(400).json({ mensaje: 'Debe enviar al menos un producto' });
        }

        // Validar cliente
        const cliente = await Cliente.findOne({ clienteId });
        if (!cliente) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

        // Calcular total y armar detalles
        let total = 0;
        const detalles = [];

        for (const item of productos) {
            const producto = await Producto.findById(item.productoId);
            if (!producto) {
                return res.status(404).json({ mensaje: `Producto no encontrado: ${item.productoId}` });
            }

            const subtotal = producto.precio * item.cantidad;
            total += subtotal;

            detalles.push({
                productoId: producto._id,
                cantidad: item.cantidad,
                precioUnitario: producto.precio
            });
        }

        // Categorizar cliente y aplicar descuento
        const categoria = await categorizarCliente(clienteId, total);
        const { montoConDescuento, descuentoAplicado } = generarFactura(total, categoria);

        // Crear pedido
        const nuevoPedido = new Pedido({
            clienteId,
            total: montoConDescuento,
            descuentoAplicado,
            estado: 'Pagado'
        });

        const pedidoGuardado = await nuevoPedido.save();

        // Guardar detalles del pedido
        for (const detalle of detalles) {
            await new DetallePedido({
                pedidoId: pedidoGuardado._id,
                productoId: detalle.productoId,
                cantidad: detalle.cantidad,
                precioUnitario: detalle.precioUnitario
            }).save();
        }

        // Registrar el pago
        await new Pago({
            pedidoId: pedidoGuardado._id,
            metodo: metodoPago,
            monto: montoConDescuento,
            fechaPago: new Date()
        }).save();

        res.status(201).json({ pedido: pedidoGuardado });

    } catch (error) {
        console.error('Error creando pedido:', error);
        res.status(500).json({ mensaje: 'Error al crear el pedido' });
    }
};

export const obtenerPedidosCliente = async (req, res) => {
    try {
        const clienteId = req.usuarioBDD.id;

        const pedidos = await Pedido.find({ clienteId })
            .populate('clienteId', 'nombre correoElectronico')
            .populate({
                path: 'detallePedido',
                populate: { path: 'productoId', select: 'nombre precio' }
            });

        res.json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos del cliente' });
    }
};

// ✅ Listar todos los pedidos (solo para Vendedor/Admin)
export const obtenerTodosLosPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('clienteId', 'nombre correoElectronico')
            .sort({ createdAt: -1 });

        res.json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos' });
    }
};