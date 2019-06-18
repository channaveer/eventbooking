global.BASE_URL = __dirname;
const express   = require('express');
const app       = express();
require(BASE_URL + '/startup/security')(app);
require(BASE_URL + '/startup/logging')();
require(BASE_URL + '/startup/routes')(app, express);
require(BASE_URL + '/startup/db')();
app.listen(process.env.APP_PORT, () => console.log('Running node app on port : ' + process.env.APP_PORT));