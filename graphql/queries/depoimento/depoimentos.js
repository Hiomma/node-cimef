const {
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const models = require('../../../models/index.js');
const Depoimento = require('../../types/depoimento.js');

module.exports = {
    type: new GraphQLList(Depoimento),
    args: {
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
            description: 'Limita o retorno de itens. Padrão: 10',
        },
        offset: {
            type: GraphQLInt,
        },
    },
    resolve(root, args) {
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
        return models.Depoimento.findAll({ where: args, offset, limit });
    }
};
