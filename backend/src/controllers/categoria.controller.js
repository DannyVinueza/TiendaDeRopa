import Categoria from "../models/Categoria.model.js";

export const crearCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaCategoria = new Categoria({nombre});
        await nuevaCategoria.save();
        res.status(201).json({ msg: 'Categoria creada', nuevaCategoria });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear categoría', error });
    }
};

export const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener categorías', error });
    }
};

export const obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener categoría', error });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id, { nombre }, { new: true });
        res.json({ msg: 'Categoria actualiada', categoriaActualizada });
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar categoría', error });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        await Categoria.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar categoría', error });
    }
};