/// Dependencies ///
const { Sequelize } = require('sequelize');
const dbConfig = require('./dbConfig');
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

db.Users = require('../models/usersModel');
db.Stories = require('../models/storiesModel');

db.Users.hasMany(db.Stories, {
    foreignKey: 'authorUsername',
    onDelete: 'CASCADE',
});
db.Stories.belongsTo(db.Users, {
    foreignKey: 'authorUsername',
});
db.dataSync = async () => {
    try {
        await db.sequelize.sync({ force: true });
        console.log('data synced...');
    } catch (err) {
        console.log(`Error${err}`);
    }
};

module.exports = db;
