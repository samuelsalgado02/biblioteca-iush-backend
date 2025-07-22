import express from 'express';
import { getUsuarios, createUsuario, deleteUsuario } from '../controllers/usuariosController.js';
import { loginUsuario } from '../controllers/usuariosController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.delete('/:id', deleteUsuario);
router.post('/login', loginUsuario);

export default router;