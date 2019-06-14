const express = require('express');
const router = express.Router();
const {User, validateUserSchema, validateUser}  = require(BASE_URL + '/models/user');
const bcrypt    = require('bcryptjs');

async function isEmailInuse(email) {
    return  await User.findOne({ 'email' : email });
}

async function hashPassword(password) {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_LENGTH))
}

router.post('/create-user', async (req, res, next) => {
    const { error } = validateUserSchema(req.body);
    if(error) { 
        return res.status(400).send({
            status  : 'error',
            message : 'Not valid user details',
            data    : {
                'error' : error.details
            } 
        }); 
    }
    let user = await isEmailInuse(req.body.email);
    if(user) {
        return res.status(400).send({
            status  : 'error',
            message : 'Email already in use',
            data    : {
                'error' : [{
                        message : 'Email already in use ' + user.email,
                        path    : [
                            'email'
                        ]
                }]
            } 
        });
    }
    const hashedPassword = await hashPassword(req.body.password);
    user = new User({
        firstname   : req.body.firstname,
        lastname    : req.body.lastname,
        email       : req.body.email,
        password    : hashedPassword    
    });
    user = await user.save();

    res.status(200).send({
        status  : 'success',
        message : "Added user successfully.",
        data    : {
            userDetails : {
                _id     : user._id,
                email   : user.email
            }
        }
    });
});

router.post('/authenticate-user', async (req, res) => {
    const { error } = validateUser(req.body);
    if(error) { 
        return res.status(400).send({
            status  : 'error',
            message : 'Not valid user details',
            data    : {
                'error' : error.details
            } 
        });
    }
    let user = await User.findOne({ email : req.body.email });
    if(!user) { 
        return res.status(400).send({
            status  : 'error',
            message : 'Incorrect email or password',
            data    : {
                'error' : [{
                        message : 'Incorrect email or password',
                }]
            } 
        });
    }
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){ 
        return res.status(400).send({
            status  : 'error',
            message : 'Incorrect email or password',
            data    : {
                'error' : [{
                        message : 'Incorrect email or password',
                }]
            } 
        });
    }
    res.status(200).send({
        status  : 'success',
        message : 'Authenticated user successfully.',
        data    : {
            userDetails : {
                _id     : user._id,
                email   : user.email 
            }
        }
    });
});

module.exports = router;