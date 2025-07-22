import express from 'express';
import cors from 'cors';
import pool from './db.js'; // ⬅️ importa tu conexión aquí


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Probar conexión MySQL
try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión exitosa a la base de datos MySQL');
    connection.release();
} catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error);
}

// Importar y usar las rutas
import librosRoutes from './routes/libros.routes.js';
app.use('/api/libros', librosRoutes);

import usuarioRoutes from './routes/usuario.router.js';
app.use('/api/usuarios', usuarioRoutes);


app.get('/', (req, res) => {
    res.send('Servidor Biblioteca IUSH funcionando ✅');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
