require('dotenv').config();
const express = require('express');
const app = express();
const cookiePasrser = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler');
const {logRequest} = require('./middlewares/logger');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const corsOption = require('./config/corsConfig')
const cors = require('cors');
const credentials = require('./middlewares/credentials'); 
const router = express.Router();

const PORT =  process.env.PORT|| 4000;

connectDB();

app.use(logRequest);
// const cors = require('cors');

// const app = express();
/** Handle options credential check - before CORS
 * and fetch cookies credentail requirements. */

// setting up cors
app.use(credentials)
// app.use(cors());

app.use(cors(corsOption));


app.use(express.json());
// app.use({})
app.use(express.urlencoded({extended: false}));

// Middleware for cookies
app.use(cookiePasrser())


    // app.use('/',

    //     router.get('/', (req, res) => {
    //         res.status(200).json({
    //             message: 'Welcome to paper trade'
    //         });
    //     })

    // )

    // //Unprotected Routes
    // app.use('/signup', require('./register'));
    // app.use('/auth', require('./auth'));



//setting up all root routes
require('./routes/root')(app);



//error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
})
