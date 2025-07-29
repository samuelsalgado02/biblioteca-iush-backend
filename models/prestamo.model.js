// models/index.js
import { Sequelize, DataTypes } from "sequelize";
import LibroModel from "./libro.model.js";
import UsuarioModel from "./usuario.model.js";
import sequelize from "../config/db.config.js";

// 👇 CORRECTO: Importa el modelo con require y ejecútalo con sequelize y DataTypes
const PrestamoModel = require("./prestamo.model.js");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicialización de modelos
db.Libro = LibroModel(sequelize, DataTypes);
db.Usuario = UsuarioModel(sequelize, DataTypes);
db.Prestamo = PrestamoModel(sequelize, DataTypes);

// Asociaciones (si las tienes)
if (db.Prestamo.associate) db.Prestamo.associate(db);
if (db.Libro.associate) db.Libro.associate(db);
if (db.Usuario.associate) db.Usuario.associate(db);

export default db;
