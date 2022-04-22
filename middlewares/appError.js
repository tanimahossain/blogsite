class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
exports.wrongRoute = (req, res) => {
    const response = {
        status: 'failed',
        message: `Where are you going? There is not path called ${req.originalUrl}`,
    };
    res.status(200).send(response);
};
