const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if(['', '/'].includes(req.path)){
        next();
    }
    const token = req.header('x-authorization');
    if (!token) {
        return res.status(401).send("Invalid Token. Access Denied.");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (e) {
        return res.status(401).send("Un-Authorized Token");
    }
}