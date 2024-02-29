const {DataTypes} = require('sequelize');
const sequelize = require('../db/DB-connection');
const theme = require('./themeModel');


const word = sequelize.define('word', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    word: {
        type: DataTypes.STRING
    },
    definition: {
        type: DataTypes.STRING
    },
    theme_id: {
        type: DataTypes.INTEGER,
        references: {
            model: theme,
            key: 'id'
        }
    }
});


module.exports = word;