//dependencies
const express = require('express');
const environment = require('./helpers/environments');

//app object  -module scaffolding
const app = express();

//create server
app.listen(environment.port,() => {
    //console.log(`environment variable is ${process.env.NODE_ENV}`);
    console.log(`listening to port ${environment.port}`);
});


//start the server
module.exports = app;