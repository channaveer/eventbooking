const mongoose  = require('mongoose');
mongoose.set('useCreateIndex', true);
module.exports = function(){
    mongoose.connect(process.env.DB_CONNECTION+"://"+ process.env.DB_USERNAME + ':'+ process.env.DB_PASSWORD + '@'  + process.env.DB_HOST +":"+ process.env.DB_PORT +"/"+process.env.DB_NAME + "?authSource=" + process.env.DB_AUTH_SOURCE, { useNewUrlParser: true })
        .then( () => console.log('Connected to mongodb successfully'));
}