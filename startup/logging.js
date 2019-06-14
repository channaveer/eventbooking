require('express-async-errors'); 
const winston   = require('winston');

module.exports = function(){
    process.on('unhandledRejection', (error) => {
        throw error;
    });
    winston.add(new winston.transports.File({ filename : "logs/app.log", handleExceptions: true }));
}