const mongoose      = require('mongoose');
const Joi           = require('@hapi/joi');
const jwt           = require('jsonwebtoken');
const userSchema    = new mongoose.Schema({
    firstname : {
        type        : String,
        min         : 3,
        max         : 30,
        required    : true
    },
    lastname : {
        type    : String,
        min     : 3,
        max     : 30
    },
    email : {
        type        : String,
        min         : 7,
        max         : 100,
        required    : true,
        unique      : true,
        index       : true
    },
    password : {
        type        : String,
        min         : 10,
        max         : 200,
        required    : true
    },
    deleted_at : {
        type : Date,
    }
}, {
    timestamps : { createdAt: 'created_at', updatedAt : 'updated_at' }
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: 60 * 60
        }
    );
}

const User = new mongoose.model('user', userSchema);

function validateUserSchema(user){
    const schema = {
        firstname   : Joi.string().min(3).max(30).required(),
        lastname    : Joi.string().min(3).max(30),
        email       : Joi.string().min(7).max(100).required().email(),
        password    : Joi.string().min(5).max(300).required()
    };
    return Joi.validate(user, schema, { abortEarly : false });
}

function validateUser(user){
    const schema = {
        email       : Joi.string().min(7).max(100).required().email(),
        password    : Joi.string().min(5).max(300).required()
    };
    return Joi.validate(user, schema, { abortEarly : false });
}

module.exports.User                 = User;
module.exports.validateUserSchema   = validateUserSchema;
module.exports.validateUser         = validateUser;