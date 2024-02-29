// ----------------------------------------------
// Importation de express
// ----------------------------------------------

const express = require('express');

// ----------------------------------------------
// Importation des routes
// ----------------------------------------------

const themeRouter = require('../src/routes/themeRouter.js');
const wordRouter = require('../src/routes/wordRouter.js');


// ----------------------------------------------
// Initialisation et configuration
// ----------------------------------------------
const server = express();
server.use(express.json());
server.set('json spaces', 2);

server.use('/themes', themeRouter);
server.use('/words', wordRouter);

server.get('/', (req, res) => {
    res.send('API-Motus')
})

const port = Number(process.env.PORT || 3000)
server.listen(port)

console.log('Server started on link http://localhost:' + port);

module.exports = server;