module.exports = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let status = err.status || 'error';
    // console.log('error msg start');
    // console.log(err);
    // console.log('error msg end', err.name);
    if (err.message.startsWith('Validation error')) {
        statusCode = 400;
        status = 'failed';
    }
    res.status(statusCode).send({
        status,
        message: err.message,
    });
    return next();
};
