/// decependencies ///
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const environments = require('../helpers/environments');
const User = require('../models/usersModel');
const hashString = require('../utilities/hashString');
/// dependencies ///

exports.getToken = (userInfo) => {
    const token = jwt.sign(userInfo, environments.jwtSecretKey, {
        expiresIn: environments.jwtExpire,
    });
    return token;
};

exports.parseToken = async (req, res) => {
    let token;
    /// Existence of Token
    console.log('token coming');
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const { 1: arr } = req.headers.authorization.split(' ');
        token = arr;
    } else {
        return res.status(401).send('Please log in first!');
    }
    /// Verification of Token
    console.log('payload coming');
    const val = await promisify(jwt.verify)(token, environments.jwtSecretKey);
    return val;
};

exports.authorize = async (req, res, next) => {
    let payload;
    try {
        payload = await this.parseToken(req, res);
    } catch (err) {
        res.status(400).send(`gkdjsyg ${err}`);
    }
    if (!payload.userName) {
        return res.status(401).send('Authorize! Please log in first!');
    }
    console.log(typeof payload, payload);
    /// User Exists
    const userStillExists = await User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: {
            userName: payload.userName,
        },
    });
    if (!userStillExists) {
        return res.status(401).send('Authorize!! Please log in first!');
    }

    /// If password changed after issuing this token
    if (userStillExists.passChanged > payload.iat) {
        return res.status(401).send('looks like your password has changed! Please log in again!');
    }
    return next();
};

exports.logIn = async (req, res) => {
    console.log(req.body);
    const userInfo = req.body;

    /// Provided username and password
    if (!userInfo.userName || !userInfo.password) {
        return res.status(401).send('Please provide username and password properly');
    }

    /// Username exists
    const userCheck = await User.findOne({
        attributes: ['userName', 'password'],
        where: {
            userName: userInfo.userName,
        },
    });
    if (!userCheck) {
        return res.status(404).send('No such user exists');
    }

    /// Password is Correct
    if (!hashString.checkHash(userCheck.password, userInfo.password)) {
        return res.status(401).send('Wrong password');
    }
    const token = this.getToken({ userName: userInfo.userName });
    return res.status(200).send({
        status: 'logges In successfully',
        userName: userInfo.userName,
        token,
    });
};
