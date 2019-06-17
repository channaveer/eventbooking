global.BASE_URL = __dirname;
const express   = require('express');
const app       = express();

const users         = require(BASE_URL + '/routes/users');
const events        = require(BASE_URL + '/routes/events');
require(BASE_URL + '/startup/security')(app);
require(BASE_URL + '/startup/logging')();
require(BASE_URL + '/startup/db')();
const authorization = require(BASE_URL + '/middleware/auth');
const error         = require(BASE_URL + '/middleware/errors');

app.get('/', (req, res) => res.send('Welcome to event booking'));
app.use(express.json());
app.use('/api/users', users);
app.use(authorization);  
app.use('/api/events', events);
app.use(error);
app.listen(process.env.APP_PORT, () => console.log('Running node app on port : ' + process.env.APP_PORT));