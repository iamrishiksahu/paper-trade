const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const emailPassLoginController = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Username and password are required!', email: email, pass: password });
    }

    const foundUser = await User.findOne({ email: email }).exec();

    if (!foundUser) {
        // User not found   
        return res.status(401).json({
            message: `USER_NOT_FOUND`
        })
    }


    try {
        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            // Password does not match
            return res.status(401).json({
                message: `INCORRECT_PASSWORD`
            })
        }


        //match is successful, generate access + refresh tokens
        const refreshToken =  jwt.sign({
            
                username: foundUser.username,
                firstname: foundUser.firstname,
                email: foundUser.email,
                userRoles: foundUser.roles
            
        }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '36000s' });


        const accessToken = await jwt.sign({
            username: foundUser.username,
            firstname: foundUser.firstname,
            email: foundUser.email,
            userRoles: foundUser.roles
        }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '300s' });

        foundUser.refreshToken = refreshToken;

        const result = await foundUser.save().catch(err => {
            console.error(err)
            return res.status(500).json({ message: err })
        })

        //Issuing cookie
        //HTTP-Only cookie is not available to JS. So cannot be stolen by hackers
        // httpOnly: true, sameSite: 'None', secure: true,
        //sameSite: 'None' was creating the problem
        res.cookie('jwt', refreshToken, {httpOnly: true, secure:true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 }); //1day

        return res.status(201).json({
            firstname: foundUser.firstname,
            message: `LOGIN_SUCCESS`,
            email: foundUser.email,
            accessToken: accessToken,
            roles: foundUser.roles,

        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err })
    }
}

module.exports = { emailPassLoginController }
