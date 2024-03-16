const User = require("../../models/User");


const logoutController = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) {
        // we don't have any refresh token over here
        return res.sendStatus(204) // All done and no content is returned
    }

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

    if (!foundUser) {
        // clearing the cooke
        res.clearCookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204) // All done and no content is returned
    }

    //removing the access token from the user directory
    foundUser.refreshToken = '';
    const response = await foundUser.save().catch(err => {
        res.satus(500).json({ message: 'INERNAL_SERVER_ERROR', msg: err });
        console.error(err);
    });
    console.log(response)

    // clearing the cooke
    res.clearCookie('jwt', refreshToken, { httpOnly: true, secure: true,  sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204) // All done and no content is returned

}


module.exports = { logoutController };