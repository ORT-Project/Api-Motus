// ----------------------------------------------
// Importation de express
// ----------------------------------------------

const express = require('express');

// ----------------------------------------------
// Importation des routes
// ----------------------------------------------

const themeRouter = require('../src/routes/themeRouter.js');


// ----------------------------------------------
// Initialisation et configuration
// ----------------------------------------------
const server = express();
// server.use(express.json());
// server.set('json spaces', 2);

server.use('/themes', themeRouter);

server.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = Number(process.env.PORT || 3000)
server.listen(port)

module.exports = server;