const dotenv = require("dotenv");
const {Sequelize} = require('sequelize');


dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        schema: 'public',
        timestamps: false,
        freezeTableName: true
    }
});


module.exports = sequelize;