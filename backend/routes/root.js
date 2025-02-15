const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/verifyJWT');

const rootRouter = (app) => {

    //Root routes

    app.use('/',

        router.get('/', (req, res) => {
            return res.status(200).json({
                message: 'Welcome to paper trade'
            });
        })

        
    )

    //Unprotected Routes
    app.use('/signup', require('./register'));
    app.use('/auth', require('./auth'));



    //JWT Protescted routes below

    app.use('/user', verifyJWT); //verify the request only then move to the next route
    app.use('/user', require('./user'));
    app.use('/market', require('./market'));


    // Dedicated route to perform testing

    app.use('/test', require('./test'));


    //404 handler
    app.use('*', (req, res) => {
        res.status(404).json({
            message: 'Oops! The resource you are looking for is not found :)'
        })
    });

}

module.exports = rootRouter