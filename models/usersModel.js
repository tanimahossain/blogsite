const { DataTypes } = require('sequelize');
const { sequelize } = require('sequelize');
const dbConfig = require('../database/dbConfig');
const hashString = require('../utilities/hashString');

const User = dbConfig.sequelize.define(
    'user',
    {
        userName: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    arg: true,
                    msg: 'Username can not be null',
                },
                isAlphanumeric: {
                    arg: true,
                    msg: 'Characters you used are not allowed. It must be Alphanumeric',
                },
                notEmpty: {
                    arg: true,
                    msg: 'Username can not be empty',
                },
            },
        },
        fullName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    arg: true,
                    msg: 'Full Name can not be null',
                },
                notEmpty: {
                    arg: true,
                    msg: 'Full Name can not be empty',
                },
            },
        },
        eMail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    arg: true,
                    msg: 'Not a valid email',
                },
                notNull: {
                    arg: true,
                    msg: 'Email can not be null',
                },
                notEmpty: {
                    arg: true,
                    msg: 'Email can not be empty',
                },
            },
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                notNull: {
                    arg: true,
                    msg: 'Password can not be null',
                },
                notEmpty: {
                    arg: true,
                    msg: 'Password can not be empty',
                },
                len: {
                    args: [8, 32],
                    msg: 'The password length should be between 8 and 32 characters.',
                },
            },
        },
        passChanged: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
    },
    {
        hooks: {
            //
        },
        sequelize,
        // eslint-disable-next-line prettier/prettier
    },
);

User.addHook('afterValidate', async (req) => {
    const hash = await hashString.makeHash(req.password);
    req.password = hash;
});

module.exports = User;
