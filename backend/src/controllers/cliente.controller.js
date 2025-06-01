import HistorialNavegacion from "../models/HistorialNavegacion.model.js";
import Producto from "../models/Producto.model.js";

export const explorarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al explorar productos' });
    }
};

export const verDetalleProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al ver detalle del producto' });
    }
};

export const sugerencias = async (req, res) => {
    try {
        const historial = await HistorialNavegacion.find({ clienteId: req.usuario._id });
        const idsExcluidos = historial.map(h => h.productoId);
        const sugeridos = await Producto.find({ _id: { $nin: idsExcluidos } });
        res.json(sugeridos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener sugerencias' });
    }
};