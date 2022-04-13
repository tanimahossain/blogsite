const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./../database/dbConfig.js');

const User  = dbConfig.sequelize.define( 'user', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eMail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
