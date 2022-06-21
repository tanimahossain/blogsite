const Users = require('../models/usersModel');
const Stories = require('../models/storiesModel');

Users.hasMany(Stories, {
    foreignKey: 'authorUsername',
    onDelete: 'CASCADE',
});
Stories.belongsTo(Users, {
    foreignKey: 'authorUsername',
});
