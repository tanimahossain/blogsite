/// decependencies ///
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const environments = require('../helpers/environments');
const User = require('../models/usersModel');
const hashString = require('../utilities/hashString');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../middlewares/appError');
/// dependencies ///

exports.getToken = (userInfo) => {
    const token = jwt.sign(userInfo, environments.jwtSecretKey, {
        expiresIn: environments.jwtExpire,
    });
    return token;
};

exports.parseToken = async (req, res, next) => {
    let token;
    /// Existence of Token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const { 1: arr } = req.headers.authorization.split(' ');
        token = arr;
    } else {
        next(new AppError('Please log in First', 401));
    }
    /// Verification of Token
    let payload;
    await promisify(jwt.verify)(token, environments.jwtSecretKey).then((val) => {
        payload = val;
        console.log(val);
    });
    console.log(payload);
    return payload;
};

exports.authorize = catchAsync(async (req, res, next) => {
    let payload;
    console.log('came here 1');
    await this.parseToken(req, res, next).then((val) => {
        console.log(val);
        payload = val;
    });
    if (!payload.userName) {
        return next(new AppError('Please log in First', 401));
    }

    /// User Exists
    const userStillExists = await User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        where: {
            userName: payload.userName,
        },
    });
    if (!userStillExists) {
        return next(new AppError('User not found!', 404));
    }

    /// If password changed after issuing this token
    if (userStillExists.passChanged > payload.iat) {
        return next(new AppError('Please log in again', 401));
    }
    console.log('came here');
    return next();
});

exports.logIn = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const userInfo = req.body;

    /// Provided username and password
    if (!userInfo.userName || !userInfo.password) {
        return next(new AppError('Please provide username password correctly', 400));
    }

    /// Username exists
    const userCheck = await User.findOne({
        attributes: ['userName', 'password'],
        where: {
            userName: userInfo.userName,
        },
    });
    if (!userCheck) {
        return next(new AppError('Username or Password wrong', 401));
    }

    /// Password is Correct
    const flag = await hashString.checkHash(userCheck.password, userInfo.password);
    console.log(`inflag: ${!flag}`, flag);
    if (!flag) {
        return next(new AppError('Username or password wrong', 401));
    }
    const token = this.getToken({ userName: userInfo.userName });
    return res.status(200).send({
        status: 'logges In successfully',
        userName: userInfo.userName,
        token,
    });
});
