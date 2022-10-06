/// Dependencies ///
const environment = require('./helpers/environments');
const app = require('./app');

/// create server ///
app.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
});
