const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('./src/controllers/databaseController')
require('dotenv').config();
const routes = require('./src/routes')
var PORT = process.env.PORT || 3333;
function server_config(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "*");
}
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use([bodyParser.urlencoded({ extended: false }), bodyParser.json(), routes])
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

// é uma verificação nas variaveis ambiente pra ver se é uma configuração do pc do victor ou não,
// e com base nisso é determinado 10 ms ou 5 segundos
var time = !process.env.CONFIG_VICTOR ? 10 : 5000;
setTimeout(
    () => {
        console.log("conectando ao banco de dados....")
        db.createDB();
    }, time);