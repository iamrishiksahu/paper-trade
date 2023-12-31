const whitelist = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if(whitelist.includes(origin)){
        res.setHeader('Access-Control-Allow-Credentails', true);

    }
    next();
}

module.exports = credentials


