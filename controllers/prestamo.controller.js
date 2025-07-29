import pool from '../db.js';

// Obtener todos los préstamos
export const obtenerPrestamos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prestamo');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los préstamos' });
  }
};

// Crear un nuevo préstamo
export const crearPrestamos = async (req, res) => {
  const { fechaInicio, fechaFin, libroId, usuarioId } = req.body;

  try {
    // Validar que el libro no esté prestado en ese rango
    const [conflicto] = await pool.query(
      `SELECT * FROM prestamo 
       WHERE libroId = ? 
         AND fechaInicio <= ? 
         AND fechaFin >= ?`,
      [libroId, fechaFin, fechaInicio]
    );

    if (conflicto.length > 0) {
      return res.status(400).json({ mensaje: 'El libro no está disponible en esas fechas.' });
    }

    // Insertar nuevo préstamo
    const [result] = await pool.query(
      'INSERT INTO prestamo (fechaInicio, fechaFin, libroId, usuarioId) VALUES (?, ?, ?, ?)',
      [fechaInicio, fechaFin, libroId, usuarioId]
    );

    res.status(201).json({ id: result.insertId, mensaje: 'Préstamo creado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el préstamo' });
  }
};

// Verificar si un libro está disponible para prestar en el rango de fechas
export const verificarDisponibilidad = async (req, res) => {
  const { libroId, fechaInicio, fechaFin } = req.body;

  try {
    const [conflictos] = await pool.query(`
      SELECT * FROM prestamo 
      WHERE libroId = ? 
        AND fechaInicio <= ? 
        AND fechaFin >= ?
    `, [libroId, fechaFin, fechaInicio]);

    if (conflictos.length > 0) {
      return res.json({ disponible: false });
    }

    res.json({ disponible: true });
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    res.status(500).json({ mensaje: 'Error al verificar disponibilidad' });
  }
};
