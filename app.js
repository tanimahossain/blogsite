/// Dependencies
const express = require('express');

const app = express();
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const storyRoutes = require('./routes/storyRoutes');
const db = require('./database/dbConnect');

/// *** unnecessary for production only use in dev testing *** ///
app.use(morgan('dev'));
/// *** unnecessary for production only use in dev testing *** ///

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stories', storyRoutes);

/// database Connection///
db.connect();
db.dataSync();

module.exports = app;
