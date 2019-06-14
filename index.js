global.BASE_URL = __dirname;
const users     = require(BASE_URL + '/routes/users');
const error     = require(BASE_URL + '/middleware/errors');
const express   = require('express');
const app       = express();
require(BASE_URL + '/startup/logging')();
require(BASE_URL + '/startup/db')();

app.get('/', (req, res) => res.send('Welcome to event booking'));
app.use(express.json());
app.use('/api/users', users);
app.use(error);
app.listen(process.env.APP_PORT, () => console.log('Running node app on port : ' + process.env.APP_PORT));