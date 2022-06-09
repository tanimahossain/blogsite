const { DataTypes } = require('sequelize');
const dbConfig = require('../database/dbConfig');

const Story = dbConfig.sequelize.define('story', {
    storyId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    storyNo: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    authorName: {
        type: DataTypes.STRING(105),
        validate: {
            len: {
                args: [1, 100],
                msg: 'The Author Name can have a length maximum of 100 characters.',
            },
        },
    },
    storyTitle: {
        type: DataTypes.STRING(350),
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
            len: {
                args: [1, 100],
                msg: 'Story Title can have a length maximum of 100 characters.',
            },
        },
    },
    openingLines: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    storyDescription: {
        type: DataTypes.STRING(10005),
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
            len: {
                args: [1, 10000],
                msg: "Release your post into episodes it's large for a single one. A post can only take 10,000 letters",
            },
        },
    },
});

module.exports = Story;
