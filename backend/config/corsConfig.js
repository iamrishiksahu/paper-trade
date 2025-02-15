const whitelist = require('./allowedOrigins');

const corsOption = {
  origin: (origin, callback) => {

    if(process.env.NODE_ENV == "DEVELOPMENT"){
      return callback(null, true)
    }
    
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
  ,
  optionsSuccessStatus: 200
}

module.exports = corsOption