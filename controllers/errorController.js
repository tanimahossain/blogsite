module.exports = (err, req, res, next) => {
    let statusCode;
    let status = err.status || 'error';
    // console.log('error msg start');
    // console.log(err);
    // console.log('error msg end', err.name);
    if (err.message.startsWith('Validation error')) {
        statusCode = 400;
        status = 'failed';
    } else if (err.statusCode) {
        statusCode = err.statusCode;
    } else {
        statusCode = 500;
        err.message = 'Something went Wrong';
    }
    if (err.message === 'Validation error') {
        err.message = 'Someone used this email already';
    }
    const errMessageArray = err.message.split('Validation error');
    err.message = '';
    for (let i = 0; i < errMessageArray.length; i++) {
        for (let j = 0; j < errMessageArray[i].length; j++) {
            if (errMessageArray[i][j] >= 'a' && errMessageArray[i][j] <= 'z') {
                err.message = err.message + errMessageArray[i].substring(j) + '\n';
                break;
            }
            if (errMessageArray[i][j] >= 'A' && errMessageArray[i][j] <= 'Z') {
                err.message = err.message + errMessageArray[i].substring(j) + '\n';
                break;
            }
        }
    }
    res.status(statusCode).send({
        status,
        message: err.message,
    });
    return next();
};
