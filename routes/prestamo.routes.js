import express from 'express';
import { obtenerPrestamos,verificarDisponibilidad, crearPrestamos,
  eliminarPrestamo } from '../controllers/prestamo.controller.js';

const router = express.Router();

router.get('/', obtenerPrestamos);
router.post('/', crearPrestamos);
router.post('/verificar-disponibilidad', verificarDisponibilidad);
router.delete('/:id', eliminarPrestamo);

export default router;