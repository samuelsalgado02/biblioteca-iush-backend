import express from 'express';
import cors from 'cors';
import pool from './db.js'; // conexión a MySQL

import librosRoutes from './routes/libros.routes.js';
import usuarioRoutes from './routes/usuario.router.js';
import prestamosRoutes from './routes/prestamo.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Probar conexión MySQL
pool.getConnection()
  .then((connection) => {
    console.log('✅ Conexión exitosa a la base de datos MySQL');
    connection.release();
  })
  .catch((error) => {
    console.error('❌ Error de conexión a la base de datos:', error);
  });

// Usar rutas
app.use('/api/libros', librosRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/prestamos', prestamosRoutes); // ✅

app.get('/', (req, res) => {
  res.send('Servidor Biblioteca IUSH funcionando ✅');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
