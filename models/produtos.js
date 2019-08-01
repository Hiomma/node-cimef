'use strict';
module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define('Produto', {
        nome: DataTypes.STRING,
        imagem: DataTypes.STRING,
        texto: DataTypes.TEXT,
        video: DataTypes.STRING,
        ativado: DataTypes.BOOLEAN
    }, { tableName: "produtos" });
    Produtos.associate = function (models) {
        Produtos.belongsTo(models.CategoriaProduto, {
            foreignKey: "categoria_id"
        });
    };
    return Produtos;
};