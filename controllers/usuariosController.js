// src/controllers/usuario.controllers.js

import pool from '../db.js';

// Obtener usuarios
export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear usuario
export const createUsuario = async (req, res) => {
  const { nombre, codigo, contrasena, rol } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, codigo, contrasena, rol) VALUES (?, ?, ?, ?)',
      [nombre, codigo, contrasena, rol || 'usuario']
    );
    res.json({ id: result.insertId, nombre, codigo, rol: rol || 'usuario' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar usuario
export const deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Login de usuario
export const loginUsuario = async (req, res) => {
  const { codigo, contrasena } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE codigo = ? AND contrasena = ?',
      [codigo, contrasena]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Código o contraseña incorrectos' });
    }

    const usuario = rows[0];
    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      codigo: usuario.codigo,
      rol: usuario.rol
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
