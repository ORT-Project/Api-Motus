// ----------------------------------------------
// Importation de express
// ----------------------------------------------

const express = require('express');

const {Client} = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
})
client.connect()
    .then(() => {
        console.log('Connection a la BDD réussi, http://localhost:8081/')
    })
    .catch((e) => {
        console.log('Connection a la BDD échoué', e);
    });

// ----------------------------------------------
// Importation des routes
// ----------------------------------------------

// ----------------------------------------------
// Initialisation et configuration
// ----------------------------------------------
const server = express();
// server.use(express.json());
// server.set('json spaces', 2);
server.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = Number(process.env.PORT || 3000)
server.listen(port)

module.exports = server;