import express from 'express';
import { obtenerPrestamos,verificarDisponibilidad, crearPrestamos } from '../controllers/prestamo.controller.js';

const router = express.Router();

router.get('/', obtenerPrestamos);
router.post('/', crearPrestamos);
router.post('/verificar-disponibilidad', verificarDisponibilidad);

export default router;