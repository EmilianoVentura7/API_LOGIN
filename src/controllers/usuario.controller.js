import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcrypt';

const saltoBcrypt = parseInt(process.env.SALTO_BCRYPT);

const create = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({
                message: 'Faltan datos para crear el usuario',
                error: 'Campos requeridos: correo, contraseña'
            });
        }

        const usuario = new Usuario({ 
            correo, 
            contraseña: bcrypt.hashSync(contraseña, saltoBcrypt)
        });

        const result = await usuario.createUsuario();

        if (!result) {
            return res.status(400).json({
                message: 'Error al crear el usuario',
                error: 'No se pudo crear el usuario'
            });
        }

        return res.status(201).json({
            message: 'Usuario creado correctamente',
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear el usuario',
            error: error.message
        });
    }
};



export const usuarioController = { create };
