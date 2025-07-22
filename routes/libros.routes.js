import express from 'express';
import pool from '../db.js';

const router = express.Router();

// ✅ GET: obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM libros');
        res.json(results);
    } catch (err) {
        console.error('❌ Error al obtener libros:', err);
        res.status(500).json({ error: 'Error al obtener libros' });
    }
});

// ✅ POST: agregar un libro
router.post('/', async (req, res) => {
    const { titulo, autor, imagen, descripcion, categoria, idioma, disponibilidad, nivel, etiquetas } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO libros (titulo, autor, imagen, descripcion, categoria, idioma, disponibilidad, nivel, etiquetas) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [titulo, autor, imagen, descripcion, categoria, idioma, disponibilidad, nivel, JSON.stringify(etiquetas)]
        );

        res.status(201).json({
            message: '✅ Libro insertado correctamente',
            id: result.insertId
        });
    } catch (err) {
        console.error('❌ Error al insertar libro:', err);
        res.status(500).json({ error: 'Error al insertar libro' });
    }
});

// DELETE eliminar libro por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar libro:', err);
        res.status(500).json({ error: 'Error al eliminar libro' });
    }
});

export default router;
