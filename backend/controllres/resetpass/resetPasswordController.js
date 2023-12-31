const express = require('express');
const User = require('../../models/User');
const router = express.Router();

const resetPasswordController =  async (req, res) => {

    const {email} = req.body;

    if(!email){
        return res.status(401).json({
            message:'EMAIL_EMPTY'
        })
    }

    // find the user in the databse

    const foundUser = await User.findOne({email: email}).exec();


    if(!foundUser){
        return res.status(401).json({
            message:'USER_NOT_FOUND'
        })
    }

    // send reset link in email

    return res.status(201).json({
        message: 'EMAIL_SENT'
    })



}

module.exports = {resetPasswordController}