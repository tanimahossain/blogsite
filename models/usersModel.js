const { DataTypes, BOOLEAN } = require('sequelize');
const { sequelize } = require('sequelize');
const dbConfig = require('../database/dbConfig');
const hashString = require('../utilities/hashString');

const User = dbConfig.sequelize.define(
    'user',
    {
        userName: {
            type: DataTypes.STRING(55),
            primaryKey: true,
            allowNull: false,
            unique: true,
            validate: {
                is: {
                    args: /^[a-z]+[0-9a-z.]+$/g,
                    msg: 'Only use latin letters or digits, starting with a digit',
                },
                notNull: {
                    arg: true,
                    msg: 'Username can not be null',
                },
                notEmpty: {
                    arg: true,
                    msg: 'Username can not be empty',
                },
                len: {
                    args: [1, 50],
                    msg: 'The username can have a length maximum of 50 characters.',
                },
            },
        },
        fullName: {
            type: DataTypes.STRING(255),
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
                len: {
                    args: [1, 100],
                    msg: 'The Full Name can have a length maximum of 250 characters.',
                },
            },
        },
        eMail: {
            type: DataTypes.STRING(400),
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
                len: {
                    args: [1, 400],
                    msg: 'The username can have a length maximum of 400 characters.',
                },
            },
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false,
            validate: {
                is: {
                    args: /^[0-9a-zA-Z~`!@#$%^&*.()-_+={}[\]|\\/:;"'<>,?]+$/g,
                    msg: 'Only use latin letters or digits',
                },
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
        passChangedFlag: {
            type: BOOLEAN,
            allowNull: false,
        },
    },
    {
        hooks: {
            //
        },
        sequelize,
    }
);

User.addHook('afterValidate', async (req) => {
    if (req.passChangedFlag === true) {
        const hash = await hashString.makeHash(req.password);
        req.password = hash;
        req.passChangedFlag = false;
    }
});

module.exports = User;
