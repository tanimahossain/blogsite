const AppError = require('./appError');

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

exports.creatable = (req, res, next) => {
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
    return next();
};
