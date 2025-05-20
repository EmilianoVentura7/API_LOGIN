import express from 'express';
import { loginUsuario } from '../auth/login.usuario.js';

const router = express.Router();

router.post('/login-usuario', loginUsuario);

export default router;
