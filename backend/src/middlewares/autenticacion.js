import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.model.js'

const verificarAutenticacion = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(404).json({ msg: "Lo sentimos, debes proprocionar un token" })
    const { authorization } = req.headers

    try {
        const { id } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        req.usuarioBDD = await Usuario.findById(id).lean().select("-password")
        next()
    } catch (error) {
        const e = new Error("Formato del token no válido o a su vez esta expirado")
        return res.status(404).json({ msg: e.message })
    }
}

export default verificarAutenticacion