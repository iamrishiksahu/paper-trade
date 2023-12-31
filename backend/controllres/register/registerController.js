const User = require("../../models/User");
const bcrypt = require('bcrypt');
const Funds = require("../../models/Funds");
const Watchlist = require('../../models/Watchlist');
const Positions = require('../../models/Positions');
const Orders = require('../../models/Orders');
const { default: mongoose } = require("mongoose");
const Constants = require("../../models/Constants");

const registrationController = async (req, res) => {

    // destructuring the request
    const { email, password, roles, firstname, lastname } = req.body;

    // check for properly formatted request

    if (!email || !password || !firstname) {
        return res.status(400).json({
            message: "Email, Password and First Name are required!"
        })
    }

    // check for email and password format
    const emailRegEx = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,4}');
    
    if(!emailRegEx.test(email)){
        return res.status(400).json({
            message: `${email}, is not a valid email address!`
        })
    }

    if(password.length < 6){
        return res.status(400).json({
            message: `Password must of at least 6 characters!`
        })
    }


    // checking for duplicate user

    const duplicateUser = await User.findOne({ email: email }).exec();

    if (duplicateUser) {
        return res.status(409).json({ //Conflict: 409
            message: `Your account with ${email} is already created. Please log in!`
        })
    }

    // hashing the password

    const hashedPassword = await bcrypt.hash(password, 10).catch(err => {
        return res.status(500).json({
            message: 'Internal server error! Please try again later!',
            description: err
        })
    })


    /** 
     * Creating the user in the DB 
     */

    // Generating a unique username using email and math.random()
    const emailStr = email;
    const unique_username = emailStr.split('@')[0].replace('@', '') + Math.floor(Math.random() * 1000);
    
    const constantsProvider = await Constants.find();

    if(!constantsProvider[0]){
        console.log('could not load latest_account_number to issue account number');
        return res.status(500).json({message: `Could not load latest_account_number to load`})
    }

    const accNo = constantsProvider[0].latest_account_number + 1;




    try{

        const createdUser = await User.create({
            username: unique_username,
            email: email,
            accountNumbers: [accNo],
            password: hashedPassword,
            roles: roles,
            firstname: firstname,
            lastname: lastname,
        })
 
        const fundsAccount = await Funds.create({
            email: email,
            accountNumber: accNo,
        })

        const watchlistProfile = await Watchlist.create({
            email: email,
            accountNumber: accNo,
            watchlist:[]
        })
        const positions = await Positions.create({
            email: email,
            accountNumber: accNo,
            positions:[]
        })
        const orders = await Orders.create({
            email: email,
            accountNumber: accNo,
            orders:[]
        })



        return res.status(201).json({
            message: `Your account with ${email} has been created successfully. Now proceed to login!`
        })

    

    }catch (err){
        res.status(500).json({
            message: `Sorry, we were not able to create your account at the moment due to our internal error!`
        })
        console.error(err);
    }



}


module.exports = { registrationController }