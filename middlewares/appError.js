exports.wrongRoute = (req, res) => {
    const response = {
        status: 'failed',
        message: `Where are you going? There is not path called ${req.originalUrl}`,
    };
    res.status(200).send(response);
};
