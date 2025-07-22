export default (sequelize, DataTypes) => {
    const Libro = sequelize.define('Libro', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagen: {
            type: DataTypes.STRING,
        },
        descripcion: {
            type: DataTypes.TEXT,
        },
        categoria: {
            type: DataTypes.STRING,
        },
        idioma: {
            type: DataTypes.STRING,
        },
        disponibilidad: {
            type: DataTypes.STRING,
        },
        nivel: {
            type: DataTypes.STRING,
        },
        etiquetas: {
            type: DataTypes.JSON,
        },
    });
    return Libro;
};
