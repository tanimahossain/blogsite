//dependencies
const express = require('express');
const app = express();
const handler = require('./helpers/handleReqRes');


app.handler = handler;
app.handler.printfhere();
// exporting everything
module.exports = app;

