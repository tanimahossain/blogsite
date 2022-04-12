///dependencies///
const dbConfig = require('../database/dbConfig.js');
const {Sequelize, DataTypes} = require("sequelize");
///dependencies///

///scaffolding///
const db = {}
///scaffolding///

db.Sequelize = Sequelize;
db.sequelize = dbConfig.sequelize;
db.connect = async function(){
    try{
      await db.sequelize.authenticate();
        console.log( 'Connected...' );
      }
      catch(err) {
        console.log( 'Error'+err );
      }
};

db.Users = require('./../models/usersModel.js');
db.Stories = require('./../models/storiesModel.js');

db.dataSync = (async function(){
  try{
      await db.sequelize.sync({ force: true });
      console.log( 'data synced...' );
  }
  catch(err) {
      console.log( 'Error' + err );
  }
});

module.exports = db;