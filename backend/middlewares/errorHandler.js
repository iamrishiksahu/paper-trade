const errorHandler = (err, req, res, next) => {

    res.status(500).json({
        info: 'Internal server error!',
        error: err.name,
        message: err.message
        
    })
}

module.exports = errorHandler;