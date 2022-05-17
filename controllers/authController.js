/// decependencies ///
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const environments = require('../helpers/environments');
const User = require('../models/usersModel');
const hashString = require('../utilities/hashString');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../middlewares/appError');
const negotiate = require('../utilities/contentNegotiation');
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
        return next(new AppError('Please log in First', 401));
    }
    /// Verification of Token
    let payload;
    try {
        payload = await promisify(jwt.verify)(token, environments.jwtSecretKey);
    } catch (err) {
        return next(new AppError('Could not verify your token', 401));
    }
    if (!payload.userName) return next(new AppError('Could not verify your token', 401));
    else return payload;
};

exports.authorize = catchAsync(async (req, res, next) => {
    const payload = await this.parseToken(req, res, next);
    if (!payload || !payload.userName) {
        return next(new AppError('Please log in First', 401));
    } else {
        req.payload = payload;
    }

    /// User Exists
    const userStillExists = await User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChangedFlag'] },
        where: {
            userName: payload.userName,
        },
    });

    if (!userStillExists) {
        return next(new AppError('User not found!', 404));
    } else {
        /// If password changed after issuing this token
        if (userStillExists.passChanged > payload.iat) {
            return next(new AppError('Please log in again', 401));
        } else {
            return next();
        }
    }
});

exports.logIn = catchAsync(async (req, res, next) => {
    let userInfo;

    /// Provided username and password
    if (!req.body.userName || !req.body.password) {
        req.status = 400;
        return next(new AppError('Please provide username password correctly', 400));
    } else {
        userInfo = req.body;
    }

    /// Username exists
    const userCheck = await User.findOne({
        attributes: ['userName', 'password'],
        where: {
            userName: userInfo.userName,
        },
    });
    let Data;
    if (!userCheck) {
        req.status = 401;
        return next(new AppError('Username or Password wrong', 401));
    } else {
        /// Password is Correct
        const flag = await hashString.checkHash(userCheck.password, userInfo.password);
        if (!flag) {
            req.status = 401;
            return next(new AppError('Username or password wrong', 401));
        } else req.status = 200;
        const token = this.getToken({ userName: userInfo.userName });
        Data = {
            status: 'success',
            message: 'logges In successfully',
            userName: userInfo.userName,
            token,
        };
    }
    return await negotiate.negotiateData(Data, req, res, next);
});
