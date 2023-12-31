const User = require("../../models/User");
const jwt = require('jsonwebtoken');

const refreshTokenController = async (req, res) => {

    const cookies = req.cookies;

    console.log(req.cookies)

    if (!cookies?.jwt) {
        // Checking if there is cookie and it has a jwt property
        console.log("cookies are empty");
        return res.sendStatus(401);
        
    }
    const refreshToken = cookies.jwt;
 
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec()

    if (!foundUser) {
        return res.status(403).json({ message: 'USER_NOT_FOUND'});

    }

    // Evaluate JWT


    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        (err, decoded) => {

            if (err || foundUser.username !== decoded.username) {
                console.log(err, "\nThis is decoded data: ", decoded)
                return res.status(403).json({message: 'TOKEN_EXPIRED'});
            }
            const accessToken =  jwt.sign({
                username: foundUser.username,
                firstname: foundUser.firstname,
                email: foundUser.email,
                userRoles: foundUser.roles
            }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '300s' });

            res.json({ accessToken: accessToken, roles: foundUser.roles, email: foundUser.email })

        }
    )
}

module.exports = refreshTokenController
