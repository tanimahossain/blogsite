const { DataTypes } = require('sequelize');
const dbConfig = require('../database/dbConfig');

const User = dbConfig.sequelize.define('user', {
    userName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            notNull: true,
            isAlphanumeric: true,
            notEmpty: true,
        },
    },
    fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        },
    },
    eMail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notNull: true,
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
            notNull: true,
            notEmpty: true,
        },
    },
    passChanged: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
});

module.exports = User;
