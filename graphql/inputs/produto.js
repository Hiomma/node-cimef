const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLID
} = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'ProdutoInput',
    fields: () => ({
        nome: { type: GraphQLNonNull(GraphQLString) },
        texto: { type: GraphQLNonNull(GraphQLString) },
        imagem: { type: GraphQLNonNull(GraphQLString) },
        video: { type: GraphQLString },
        tabela: { type: GraphQLString },
        ativado: { type: GraphQLNonNull(GraphQLBoolean) },
        categoria_id: { type: GraphQLNonNull(GraphQLID) },
    })
});
