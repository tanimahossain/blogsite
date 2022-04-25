const AppError = require('./appError');

exports.updatable = (req, res, next) => {
    if (req.body.userName) {
        return next(new AppError("You can't change the username", 403));
    }
    if (req.body.eMail) {
        return next(new AppError("You can't change the email", 403));
    }
    return next();
};
