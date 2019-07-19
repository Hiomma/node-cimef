'use strict';
module.exports = (sequelize, DataTypes) => {
    const ImagemProduto = sequelize.define('ImagemProduto', {
        url: DataTypes.STRING
    }, {
            tableName: "imagens-produto"
        });
    ImagemProduto.associate = function (models) {
        ImagemProduto.belongsTo(models.Produto, {
            foreignKey: "produto_id"
        });
    };
    return ImagemProduto;
};