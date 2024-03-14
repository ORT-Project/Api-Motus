const {DataTypes} = require('sequelize');
const sequelize = require('../db/DB-connection');
const word = require('./wordModel');

const theme = sequelize.define('theme', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alias: {
        type: DataTypes.STRING
    }
});


theme.hasMany(word, {foreignKey: 'theme_id'});

module.exports = theme