
const {Sequelize, DataTypes} = require("sequelize");

const db = {};

db.Sequelize=Sequelize;
const sequelize = new Sequelize('blogsite', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
   });
db.sequelize = sequelize;
module.exports = db;