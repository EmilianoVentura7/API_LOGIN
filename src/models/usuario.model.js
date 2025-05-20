import db from '../configs/db.config.js';

class Usuario {
    constructor({ id, correo, contraseña }) {
        this.id = id;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    async createUsuario() {
        const connection = await db.createConnection();

        const [result] = await connection.query(
            'INSERT INTO usuarios (correo, contraseña) VALUES (?, ?)', 
            [this.correo, this.contraseña]
        );

        connection.end();

        if (result.insertId === 0) {
            throw new Error('Error al crear el usuario');
        }

        return result.insertId;
    }

    static async getCorreo(correo) {
        const connection = await db.createConnection();

        const [result] = await connection.query(
            'SELECT id, contraseña FROM usuarios WHERE correo = ?', 
            [correo]
        );

        connection.end();

        if (result.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        return result[0];
    }
}

export default Usuario;
