'use strict';
module.exports = (sequelize, DataTypes) => {
    const Categoria = sequelize.define('Categoria', {
        nome: DataTypes.STRING,
        ativado: DataTypes.BOOLEAN
    }, {
            tableName: "categorias"
        });
    Categoria.associate = function (models) {
        // associations can be defined here
    };
    return Categoria;
};