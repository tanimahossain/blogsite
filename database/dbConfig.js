/// Dependencies ///
const { Sequelize } = require('sequelize');
/// Dependencies ///

const db = {};

db.Sequelize = Sequelize;
const sequelize = new Sequelize('FbyQBewEST', 'FbyQBewEST', 'xtpeRArZQP', {
    host: 'remotemysql.com',
    port: 3306,
    dialect: 'mysql',
    logging: false,
});
db.sequelize = sequelize;
module.exports = db;
/*
db.Sequelize = Sequelize;
const sequelize = new Sequelize('blogsite', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});


*/
