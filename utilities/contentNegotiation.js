const json2html = require('json2html');
const AppError = require('../middlewares/appError');

exports.negotiateData = async (Data, req, res, next) => {
    const arr = req.headers.accept.toString().split(',');
    for (let i = 0; i < arr.length; i += 1) {
        const { 0: temp } = arr[i].split(';');
        arr[i] = temp;
    }
    let data = JSON.parse(JSON.stringify(Data));
    data.status = 'success';
    if (arr.find((val) => val.trim() === 'application/json')) {
        return res.header('Content-Type', 'application/json').status(200).send(data);
    }
    if (!arr.length || arr.find((val) => val === '*/*')) {
        return res.header('Content-Type', 'application/json').status(200).send(data);
    }
    if (arr.find((val) => val === 'text/html')) {
        data = json2html.render(data);
        return res.header('Content-Type', 'text/html').status(200).send(data);
    }
    return next(new AppError("can't serve the data you wanted", 404));
};
