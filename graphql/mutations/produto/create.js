const models = require('../../../models/index.js');
const Produto = require('../../types/produto.js');
const ProdutoInput = require('../../inputs/produto.js');

const auth = require("../../../services/auth.graphql");

module.exports = {
    type: Produto,
    args: {
        produto: {
            type: ProdutoInput
        }
    },
    async resolve(source, args, { req }) {
        if (await auth(req)) {
            return models.Produto.build({
                nome: args.produto.nome,
                tabela: args.produto.tabela,
                imagem: args.produto.imagem,
                ativado: args.produto.ativado,
                categoria_id: args.produto.categoria_id,
                texto: args.produto.texto,
                video: args.produto.video
            }).save().then(function (newProduto) {
                return models.Produto.findByPk(newProduto.id);
            });
        } else {
            throw new Error("Não foi aceito a sua requisição, por favor, logue novamente")
        }
    }
};
