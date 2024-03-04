// ----------------------------------------------
// Importation de express
// ----------------------------------------------

const express = require('express');
const cors = require('cors');

//----------------------------------------------
// Importation de swagger
//----------------------------------------------

const swaggerFile = require('./swagger/swagger-doc.json');
const swaggerUi = require('swagger-ui-express');

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

server.use(cors({
    origin: '*'
}))

server.use('/themes', themeRouter);
server.use('/words', wordRouter);

server.get('/', (req, res) => {
    res.send('API-Motus')
    // #swagger.tags = ['Home']
    // #swagger.description = 'Racine de l\'API.'
    // #swagger.responses[200] = {description : 'API-Motus'}
    // #swagger.responses[500] = {description : 'Erreur survenue lors de la récuperation de la racine.'}
})

server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const port = Number(process.env.PORT || 3000)
server.listen(port)

console.log('Server started on link http://localhost:' + port);

module.exports = server;