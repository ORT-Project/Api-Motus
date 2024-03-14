const {DataTypes} = require('sequelize');
const sequelize = require('../db/DB-connection');


const word = sequelize.define('word', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.STRING
    },
    theme_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


module.exports = word;