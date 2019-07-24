const {
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} = require('graphql');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../../../models/index.js');
const Produto = require('../../types/produto.js');

module.exports = {
    type: new GraphQLList(Produto),
    args: {
        categoria_id: {
            type: GraphQLID,
            description: "ID da Categoria do produto"
        },
        filter: {
            type: GraphQLString,
            description: "Filtre pelas palavras chaves do conteúdo da tabela!"
        },
        ativado: {
            type: GraphQLBoolean,
            description: "Caso TRUE, retornará apenas os ativadaos, caso FALSE, retornará os não ativados, vazio retornará todos"
        },
        first: {
            type: GraphQLInt,
            description: 'Limita o retorno de itens. Padrão: 100',
        },
        offset: {
            type: GraphQLInt,
        },
    },
    resolve(root, args, req) {
        const offset = args.offset || 0;
        const limit = args.first || 100;

        if (args.filter) {
            let aux = args;

            args = {
                nome: {
                    [Op.like]: "%" + args.filter + "%"
                }
            }

            if (aux.ativado == true || aux.ativado == false) {
                args.ativado = aux.ativado;
            }

        }

        delete args.offset;
        delete args.filter;
        delete args.first;
        return models.Produto.findAll({ where: args, offset, limit });
    }
};
