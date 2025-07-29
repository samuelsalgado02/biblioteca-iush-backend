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
  try {
    const { usuario_id, libro_id, fecha_inicio, fecha_fin } = req.body;

    const [resultado] = await pool.query(
      `INSERT INTO prestamo (usuario_id, libro_id, fecha_inicio, fecha_fin)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, libro_id, fecha_inicio, fecha_fin]
    );

    res.status(201).json({ mensaje: "Préstamo creado exitosamente" });
  } catch (error) {
    console.error("Error en crearPrestamo:", error); // 👈 Este log te dirá qué falla
    res.status(500).json({ mensaje: "Error al crear el préstamo" });
  }
};


// Verificar si un libro está disponible para prestar en el rango de fechas
export const verificarDisponibilidad = async (req, res) => {
  const { libro_id, fecha_inicio, fecha_fin } = req.body;

  try {
    const [conflictos] = await pool.query(`
      SELECT * FROM prestamo 
      WHERE libro_id = ? 
        AND fecha_inicio <= ? 
        AND fecha_fin >= ?
    `, [libro_id, fecha_inicio, fecha_fin]);

    if (conflictos.length > 0) {
      return res.json({ disponible: false });
    }

    res.json({ disponible: true });
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    res.status(500).json({ mensaje: 'Error al verificar disponibilidad' });
  }
};
