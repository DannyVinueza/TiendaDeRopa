import Usuario from "../models/Usuario.model.js";
import generarJWT from '../helpers/crearJWT.js';

export const login = async (req, res) => {
  const { correoElectronico, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correoElectronico });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const isMatch = await usuario.matchPassword(contrasena);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    const token = generarJWT(usuario._id);

    res.status(200).json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correoElectronico: usuario.correoElectronico,
        rol: usuario.rol
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};

export const register = async (req, res) => {
  const { nombre, correoElectronico, contrasena } = req.body;

  try {
    let usuario = await Usuario.findOne({ correoElectronico });
    if (usuario) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    usuario = new Usuario({ nombre, correoElectronico, rol: 'Cliente' });
    usuario.contrasenaHash = await usuario.encrypPassword(contrasena);
    await usuario.save();

    const token = generarJWT(usuario._id);

    res.status(201).json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correoElectronico: usuario.correoElectronico,
        rol: usuario.rol
      },
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};