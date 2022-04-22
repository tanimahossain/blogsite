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
        res.header('Content-Type', 'application/json');
        res.status(200).send(data);
    } else if (!arr.length || arr.find((val) => val === '*/*')) {
        res.header('Content-Type', 'application/json');
        res.status(200).send(data);
    } else if (arr.find((val) => val === 'text/html')) {
        res.header('Content-Type', 'text/html');
        data = json2html.render(data);
        res.status(200).send(data);
    } else {
        next(new AppError("can't serve the data you wanted", 404));
    }
};
