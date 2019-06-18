const users         = require(BASE_URL + '/routes/users');
const events        = require(BASE_URL + '/routes/events');
const authorization = require(BASE_URL + '/middleware/auth');
const error         = require(BASE_URL + '/middleware/errors');
module.exports = function(app, express){
    app.get('/', (req, res) => res.send('Welcome to event booking'));
    app.use(express.json());
    app.use('/api/users', users);
    app.use(authorization);  
    app.use('/api/events', events);
    app.use(error);    
}