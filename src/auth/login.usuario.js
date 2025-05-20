import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const loginUsuario = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        const usuario = await Usuario.getCorreo(correo);

        if (!usuario) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            return res.status(401).json({
                message: "Usuario o contraseña incorrectos",
            });
        }

        const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            status: 'success',
            message: "Sesión iniciada exitosamente",
            token: token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en el servidor al iniciar sesión",
            error: error.message
        });
    }
};

export { loginUsuario };
