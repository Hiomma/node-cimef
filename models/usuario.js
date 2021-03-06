'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
      tableName: "usuarios"
  });
  Usuario.associate = function(models) {
    // associations can be defined here
  };
  return Usuario;
};