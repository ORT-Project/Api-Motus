const swaggerAutogen = require('swagger-autogen');
const dotenv = require("dotenv");

dotenv.config();

const doc = {
    info: {
        title: 'Api-Motus',
        description: 'Description',
    },
    host: `localhost:${process.env.PORT || 3000}`,
};

const outputFile = './swagger-doc.json';
const routes = [
    '../server.js',
];

swaggerAutogen(outputFile, routes, doc);