import { Sequelize, DataTypes } from "sequelize";
import LibroModel from "./libro.model.js";
import sequelize from "../config/db.config.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Libro = LibroModel(sequelize, DataTypes);

export default db;
