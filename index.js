const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/controllers/databaseController')

const routes = require('./src/routes')
var PORT = process.env.PORT || 3000;
function server_config(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
}
app.use([bodyParser.urlencoded({extended: false}), bodyParser.json(), routes])
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const server = express()
// server.use(routes)
// server.use((res, req) => server_config(req, res))
// server.listen(PORT, () => console.log(`Listening on ${PORT}`));

setTimeout(
    () => {
        console.log("conectando ao banco de dados....")
        
        db.createDB();
    }, 5000);



// Starting our server.


