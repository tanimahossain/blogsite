const { DataTypes } = require('sequelize');
const dbConfig = require('../database/dbConfig');

const User = dbConfig.sequelize.define('user', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eMail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passChanged: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
});

module.exports = User;
