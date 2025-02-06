require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');  // Required to create the server for Socket.io
const { Server } = require('socket.io'); // Import Socket.io
const cookiePasrser = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler');
const {logRequest} = require('./middlewares/logger');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const corsOption = require('./config/corsConfig')
const cors = require('cors');
const credentials = require('./middlewares/credentials'); 
const {setupSocket} = require('./sockets/mainSocket');
const router = express.Router();

const PORT =  process.env.PORT|| 4000;

connectDB();

app.use(logRequest);

// Create an HTTP server from Express app
const server = http.createServer(app);

// setting up cors
app.use(credentials)
app.use(cors(corsOption));


app.use(express.json());
// app.use({})
app.use(express.urlencoded({extended: false}));

// Middleware for cookies
app.use(cookiePasrser())

//setting up all root routes
require('./routes/root')(app);

setupSocket(server);

//error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
        console.log(`Server is listening at port: ${PORT}`)
    })
})
