'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('produtos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nome: {
                type: Sequelize.STRING
            },
            imagem: {
                type: Sequelize.STRING
            },
            texto: {
                type: Sequelize.TEXT
            },
            video: {
                type: Sequelize.STRING
            },
            categoria_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "categorias-produto",
                    key: "id"
                }
            },
            ativado: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('produtos');
    }
};