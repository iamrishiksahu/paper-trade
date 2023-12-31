const User = require('../../models/User');

const getAccountInfo = async (req, res) => {

    const { username, firstname, email, roles } = req;

    const user = await User.findOne({ email: email}).exec();

    if(!user){
        res.sendStatus(404) // User not found 
    }

    res.status(201).json({
        message: 'Fetched successfully',
        data: user
    })

}
const updateAccountInfo = (req, res) => {

}

module.exports = { getAccountInfo, updateAccountInfo };
