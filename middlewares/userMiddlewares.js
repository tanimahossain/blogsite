const AppError = require('./appError');
const User = require('../models/usersModel');
const catchAsync = require('../utilities/catchAsync');

exports.updatable = (req, res, next) => {
    if (req.body.userName) {
        return next(new AppError("You can't change the username", 403));
    }
    if (req.body.eMail) {
        return next(new AppError("You can't change the email", 403));
    }
    let cnt = 0;
    const givenValues = Object.keys(req.body).length;
    if (req.body.password) cnt += 1;
    if (req.body.fullName) cnt += 1;
    if (cnt !== givenValues) {
        return next(new AppError('You have given invalid data to update', 400));
    }
    return next();
};

exports.creatable = catchAsync(async (req, res, next) => {
    let cnt = 0;
    if (req.body.userName) cnt += 1;
    if (req.body.fullName) cnt += 1;
    if (req.body.eMail) cnt += 1;
    if (req.body.password) cnt += 1;
    const givenValues = Object.keys(req.body).length;
    if (cnt < 4) {
        return next(new AppError('You are missing necessary data for creating an account', 400));
    }
    if (cnt !== givenValues) {
        return next(new AppError('You have given invalid data for creating an account', 400));
    }
    /// User Exists
    let userStillExists = await User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChangedFlag'] },
        where: {
            userName: req.body.userName,
        },
    });

    if (userStillExists) {
        return next(new AppError('Username Already Exists!', 400));
    }
    userStillExists = await User.findOne({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'passChangedFlag'] },
        where: {
            eMail: req.body.eMail,
        },
    });

    if (userStillExists) {
        return next(new AppError('Someone used this email already!', 400));
    }
    return next();
});
