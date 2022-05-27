/// Dependencies
const express = require('express');

const app = express();
//const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const storyRoutes = require('./routes/storyRoutes');
const db = require('./database/dbConnect');
const globalErrHandler = require('./controllers/errorController');
const AppError = require('./middlewares/appError');
///////
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: 'GET,PUT,POST,DELETE',
};
app.use(cors(corsOptions));
/////
/// *** unnecessary for production only use in dev testing *** ///
//app.use(morgan('dev'));
/// *** unnecessary for production only use in dev testing *** ///

app.use(express.json());

/// Routes ///
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stories', storyRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Where are you going? There is no path called ${req.originalUrl}`, 404));
});
app.use(globalErrHandler);
/// database Connection///
db.connect();
db.dataSync();

module.exports = app;
