const express = require('express');
const models = require("../models")
const fs = require('fs');

var router = express.Router();


function imagemController() {

    router.route("/imagem/:id").post(uploadImagem);
    router.route("/imagem/principal/:id").post(uploadImagemPrincipalNoticia);
    router.route("/slide/imagem/:id").post(uploadSlideImagem);
    router.route("/produto/principal/:id").post(uploadImagemPrincipalProduto);
    router.route("/produto/tabela/:id").post(uploadTabelaProduto);
    router.route("/produto/imagem/:id").post(uploadImagemProduto);
    router.route("/depoimento/imagem/:id").post(uploadTabelaDepoimento);

    return router;

    /**
     * @description Upload das fotos da noticia
     */
    async function uploadImagem(req, res) {
        if (req.files.length > 0) {
            await models.Imagem.findAll({ raw: true, where: { noticia_id: req.params.id } }).then(data => {
                for (let aux of data) {
                    fs.unlink(aux.url, () => { })
                }
            })

            await models.Imagem.destroy({ where: { noticia_id: req.params.id } });

            for (let aux of req.files) {
                await models.Imagem.build({
                    url: aux.path.replace(/\\/g, "/"),
                    noticia_id: req.params.id
                }).save();
            }

            return res.send(req.files);
        }

        return res.status(500).send('Houve erro no upload!');
    }

    /**
     * @description Upload da foto principal da noticia
     */
    async function uploadImagemPrincipalNoticia(req, res) {
        if (req.files.length > 0) {
            await models.Noticia.findByPk(req.params.id).then(data => {
                fs.unlink(data.imagem, () => { })
            })

            for (let aux of req.files) {
                await models.Noticia
                    .findByPk(req.params.id)
                    .then((noticia) => {

                        noticia.imagem = aux.path.replace(/\\/g, "/");
                        return noticia.update({ imagem: noticia.imagem });
                    });
            }

            return res.send(req.files);
        }

        return res.status(500).send('Houve erro no upload!');
    }


    /**
     * @description Upload das fotos da produto
     */
    async function uploadImagemProduto(req, res) {
        if (req.files.length > 0) {
            await models.ImagemProduto.findAll({ raw: true, where: { produto_id: req.params.id } }).then(data => {
                for (let aux of data) {
                    fs.unlink(aux.url, () => { })
                }
            })

            await models.ImagemProduto.destroy({ where: { produto_id: req.params.id } });

            for (let aux of req.files) {
                await models.ImagemProduto.build({
                    url: aux.path.replace(/\\/g, "/"),
                    produto_id: req.params.id
                }).save();
            }

            return res.send(req.files);
        }

        return res.status(500).send('Houve erro no upload!');
    }

    /**
     * @description Upload da foto principal da produto
     */
    async function uploadImagemPrincipalProduto(req, res) {
        if (req.files.length > 0) {
            await models.Produto.findByPk(req.params.id).then(data => {
                if (data)
                    fs.unlink(data.imagem, () => { })
            })

            for (let aux of req.files) {
                await models.Produto
                    .findByPk(req.params.id)
                    .then((produto) => {

                        produto.imagem = aux.path.replace(/\\/g, "/");
                        return produto.update({ imagem: produto.imagem });
                    });
            }

            return res.send(req.files);
        }

        return res.status(500).send('Houve erro no upload!');
    }

    /**
     * @description Upload da foto da tabela da produto
     */
    async function uploadTabelaProduto(req, res) {
        if (req.files.length > 0) {
            await models.Produto.findByPk(req.params.id).then(data => {
                if (data)
                    fs.unlink(data.tabela, () => { })
            })

            for (let aux of req.files) {
                await models.Produto
                    .findByPk(req.params.id)
                    .then((produto) => {

                        produto.tabela = aux.path.replace(/\\/g, "/");
                        console.log(produto.tabela)
                        return produto.update({ tabela: produto.tabela });
                    });
            }

            return res.send(req.files);
        }

        return res.status(500).send('Houve erro no upload!');
    }
    /**
     * @description Upload da foto da tabela da depoimento
     */
    async function uploadTabelaDepoimento(req, res) {
        if (req.files.length > 0) {
            await models.Depoimento.findByPk(req.params.id).then(data => {
                if (data)
                    fs.unlink(data.url, () => { })
            })

            for (let aux of req.files) {
                await models.Depoimento
                    .findByPk(req.params.id)
                    .then((depoimento) => {

                        depoimento.url = aux.path.replace(/\\/g, "/");
                        return depoimento.update({ url: depoimento.url });
                    });
            }

            return res.send(req.files);
        }

        return res.status(500).send('Houve erro no upload!');
    }

    async function uploadSlideImagem(req, res) {
        if (req.files.length > 0) {
            await models.Slide.findByPk(req.params.id).then(data => {
                fs.unlink(data.url, () => { })
            })

            for (let aux of req.files) {
                await models.Slide
                    .findByPk(req.params.id)
                    .then((slide) => {

                        slide.url = aux.path.replace(/\\/g, "/");
                        return slide.update({ url: slide.url });
                    });
            }

            return res.send(req.files);
        }

        return res.status(500).send('Houve erro no upload!');
    }
}

module.exports = imagemController;