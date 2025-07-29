// models/usuario.model.js
export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    }
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Prestamo, { foreignKey: 'usuarioId' });
  };

  return Usuario;
};
