const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.body.token;
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, 'tokensecret');
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send(err);
    }
}

