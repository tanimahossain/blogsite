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
    },
    authorName: {
        type: DataTypes.STRING,
    },
    storyTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                arg: true,
                msg: 'Title can not be null',
            },
            notEmpty: {
                arg: true,
                msg: 'Title can not be empty',
            },
        },
    },
    openingLines: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storyDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                arg: true,
                msg: 'Story can not be null',
            },
            notEmpty: {
                arg: true,
                msg: 'Story can not be empty',
            },
        },
    },
});

module.exports = Story;
