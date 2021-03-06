const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const models = require('../../../models/index.js');
const Noticia = require('../../types/noticia.js');

module.exports = {
    type: Noticia,
    args: {
        id: {
            type: GraphQLID
        },
        url: {
            type: GraphQLString
        }
    },
    resolve(root, args) {
        if (args.url) {
            return models.Noticia.findOne({ where: { url: args.url } })
        } else if (args.id) {
            return models.Noticia.findByPk(args.id);
        } else {
            return null
        }
    }
};
