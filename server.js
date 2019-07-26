const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { loginController, imagemController } = require("./controllers/");
const auth = require("./services/auth")
const express_graphql = require('express-graphql');
const Schema = require('./graphql');
const multer = require("./services/multer");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/public/", express.static("./public"))

app.use("/api", loginController())
app.use("/api", multer.array('image'), imagemController())

app.use('/graphql',
    (req, res) => {
        express_graphql({
            schema: Schema, pretty: true, graphiql: false,
            context: { req }
        })(req, res)
    });

app.listen(process.env.PORT || 3001, () => {
    console.log("Servidor está na porta 3001!");
})