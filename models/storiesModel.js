const { DataTypes } = require('sequelize');
const dbConfig = require('../database/dbConfig');

const Story = dbConfig.sequelize.define('story', {
    storyId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    storyNo: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storyTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openingLines: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storyDescription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Story;
