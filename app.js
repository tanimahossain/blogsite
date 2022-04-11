//dependencies
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const storyRoutes = require('./routes/storyRoutes');

///*** unnecessary for production only use in dev testing***///
const morgan = require('morgan');
app.use(morgan('dev'));
///*** unnecessary for production only use in dev testing***///

app.use(express.json());

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/stories',storyRoutes);
// exporting everything
module.exports = app;

