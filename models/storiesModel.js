const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('./../database/dbConfig.js');

const Story  = dbConfig.sequelize.define( 'story', {
    storyId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    authorId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storyTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    openingLines: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storyDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Story;
