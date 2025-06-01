export const esAdminRole = (req, res, next) => {
  if (!req.usuarioBDD) {
    return res.status(500).json({ msg: 'Se requiere validar token primero' });
  }

  const { rol, nombre } = req.usuarioBDD;

  if (rol !== 'Administrador') {
    return res.status(403).json({
      msg: `El usuario ${nombre} no tiene permisos para realizar esta acción`,
    });
  }

  next();
};

export const esClienteRole = (req, res, next) => {
  if (req.usuario?.rol !== 'Cliente') {
    return res.status(403).json({ mensaje: 'Acceso restringido a Clientes' });
  }
  next();
};

export const esVendedorOAdministrador = (req, res, next) => {
  if (req.usuarioBDD.rol !== 'Vendedor' && req.usuarioBDD.rol !== 'Administrador') {
    return res.status(403).json({ mensaje: 'Acceso restringido a Administrador o Vendedor' });
  }
  next();
}
