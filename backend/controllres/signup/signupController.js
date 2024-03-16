const Constants = require("../../models/Constants");
const User = require("../../models/User");

const emailPassSingupController = async (req, res) => {

    const { email, password, firstName, lastName, role } = req.body;

    if (!email || !password || !firstName) {
        return res.status(400).json({ message: 'All fields are required please provide email, password, firstName', email: email, pass: password });
    }

    try{

        const constantRepo = await Constants.find({})

        const latestAcNum = constantRepo[0].latest_account_number
        const newAccountNum = latestAcNum + 1

        const data = await User.create({
            firstname: firstName,
            lastname: lastName,
            email : email,
            password: password,
            roles: role,
            accountNumbers: [newAccountNum]
        })

        res.status(201).json({message: 'Account Created successfully!', data: data})

    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err })
    }

}

module.exports = {emailPassSingupController}