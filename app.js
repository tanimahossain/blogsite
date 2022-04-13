//dependencies
const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
const userRoutes = require('./routes/userRoutes');
const storyRoutes = require('./routes/storyRoutes');
const db = require('./database/dbConnect.js');

///*** unnecessary for production only use in dev testing***///
const morgan = require('morgan');
app.use(morgan('dev'));
///*** unnecessary for production only use in dev testing***///

app.use(express.json());


app.use('/api/v1/users',userRoutes);
app.use('/api/v1/stories',storyRoutes);

///database Connection///
db.connect();
db.dataSync();
///database Connection///


/// exporting everything///
module.exports = app;
/// exporting everything///