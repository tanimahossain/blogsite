const json2html = require('json2html');
const AppError = require('../middlewares/appError');

exports.negotiateData = async (Data, req, res, next) => {
    //console.log(req.headers);
    const arr = req.headers.accept.toString().split(',');
    for (let i = 0; i < arr.length; i += 1) {
        const { 0: temp } = arr[i].split(';');
        arr[i] = temp;
    }
    let data = JSON.parse(JSON.stringify(Data));
    let statusCode = 200;
    if (req.status) {
        statusCode = req.status;
    } else{
        req.status = 200;
    }
    if (!Data.status) data.status = 'success';
    else data.status = Data.status;
    const check = `${statusCode}`;
    if (check.startsWith('4')) data.status = 'failed';
    else if (check.startsWith('5')) data.status = 'error';
    else data.status = 'success';

    if (arr.find((val) => val.trim() === 'application/json')) {
        return res.header('Content-Type', 'application/json').status(statusCode).send(data);
    }
    if (!arr.length || arr.find((val) => val === '*/*')) {
        return res.header('Content-Type', 'application/json').status(statusCode).send(data);
    }
    if (arr.find((val) => val === 'text/html')) {
        data = json2html.render(data);
        return res.header('Content-Type', 'text/html').status(statusCode).send(data);
    }

    statusCode = 406; req.status= 406;
    return next(new AppError("Can't serve the data you wanted", statusCode));
};
