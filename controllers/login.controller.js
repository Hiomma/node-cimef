const express = require('express');
const models = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const retornarSecretKey = require("../config/auth.config");

var router = express.Router();


function loginController() {

    router.route("/login").post(login);

    return router;

    async function login(req, res) {
        models.Usuario.findOne({
            where: { email: req.body.email }
        }).then(async data => {
            if (!data) {
                res.status(401).json({ message: "Login e senha errados!" })
            } else {
                if (md5(req.body.password) == data.dataValues.password) {
                    jwt.sign({ user: data.dataValues.email }, retornarSecretKey(), { expiresIn: '24h' }, (err, token) => {
                        res.json({
                            id: data.dataValues.id,
                            user: data.dataValues.email,
                            token: token
                        })
                    });
                } else {
                    res.status(401).json({ message: "Login e senha errados!" });
                }
            }
        })
    }
}

module.exports = loginController;