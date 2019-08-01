const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const CategoriaProduto = require("./categoria-produto")
const Imagens = require("./imagens");

const models = require("../../models");

module.exports = new GraphQLObjectType({
    name: 'Produto',
    description: 'Produtos da Página Inicial',
    fields() {
        return {
            id: {
                type: GraphQLID,
                description: "ID do Produto",
                resolve(produto) {
                    return produto.id;
                }
            },
            nome: {
                type: GraphQLString,
                description: "Nome do Produto",
                resolve(produto) {
                    return produto.nome;
                }
            },
            video: {
                type: GraphQLString,
                description: "Url do Vídeo do Produto",
                resolve(produto) {
                    return produto.video;
                }
            },
            texto: {
                type: GraphQLString,
                description: "Texto/corpo da Produto",
                resolve(produto) {
                    return produto.texto;
                }
            },
            imagem: {
                type: GraphQLString,
                description: "URL da Imagem no servidor",
                resolve(produto) {
                    return produto.imagem;
                }
            },
            imagens: {
                type: new GraphQLList(Imagens),
                description: "Objeto de Imagens das Produtos",
                async resolve(produto) {
                    return models.ImagemProduto.findAll({ where: { produto_id: produto.id } });
                }
            },
            categoria: {
                type: CategoriaProduto,
                description: "Categoria dos Produtos",
                resolve(produto) {

                    return models.CategoriaProduto.findByPk(produto.categoria_id);
                }
            },
            ativado: {
                type: GraphQLBoolean,
                description: "A produto está ativada?",
                resolve(produto) {
                    return produto.ativado;
                }
            },
            createdAt: {
                type: GraphQLString,
                description: "Data de criação do Produto",
                resolve(produto) {
                    return produto.createdAt;
                }
            },
            updatedAt: {
                type: GraphQLString,
                description: "Data da ultima atualização do Produto",
                resolve(produto) {
                    return produto.updatedAt;
                }
            },
        };
    }
});
