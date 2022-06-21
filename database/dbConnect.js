/// Dependencies ///
const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');
require('./dbTableRelate');
/// Dependencies ///

const db = {};

db.Sequelize = Sequelize;
db.sequelize = dbConfig.sequelize;
db.connect = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connected...');
    } catch (err) {
        console.log(`Error ${err}`);
    }
};

db.dataSync = async () => {
    try {
        await db.sequelize.sync({ force: false });
        console.log('data synced...');
    } catch (err) {
        console.log(`Error${err}`);
    }
};

module.exports = db;
