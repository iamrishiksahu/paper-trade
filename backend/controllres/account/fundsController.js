const Funds = require('../../models/Funds.js');

const getFunds = async (req, res) => {

    const { email } = req;

    const fundsData = await Funds.findOne({ email: email }).exec();

    if (!fundsData) {
        return res.status(403).json({ message: `No funds details found with email: ${email}` });
    }

    return res.status(201).json({ fundsData });

}

const updateFunds = async (req, res) => {

    const { email } = req;
    const { amount, transaction_type } = req.body;

    const fundsData = await Funds.findOne({ email: email }).exec()

    if (!fundsData) {
        return res.status(403).json({ message: `No funds details found with email: ${email}` });
    }


    let updatedFunds = {};
    let newAmount;


    switch (transaction_type) {
        case 'DR':
            newAmount = Math.round((fundsData.fundsInfo.available_funds - amount) * 100) / 100;
            fundsData.fundsInfo.available_funds = newAmount;
            updatedFunds = await fundsData.save().catch(err => {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error: err })
                console.error(err);
            })

            break;
        case 'CR':
            newAmount = Math.round((fundsData.fundsInfo.available_funds + amount) * 100) / 100;
            fundsData.fundsInfo.available_funds = newAmount;
            updatedFunds = await fundsData.save().catch(err => {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error: err })
                console.error(err);
            })
            break;
        case 'MARGIN_UPDATE':
            fundsData.fundsInfo.margin_allowed = amount;
            updatedFunds = await fundsData.save().catch(err => {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error: err })
                console.error(err);
            })
            break;
        case 'LIEN_AMOUNT':
            fundsData.fundsInfo.lien_amount = amount;
            updatedFunds = await fundsData.save().catch(err => {
                res.status(500).json({ message: 'INTERNAL_SERVER_ERROR', error: err })
                console.error(err);
            })
            break;
        default:
            res.status(400).json({ message: 'BAD_REQUEST' })
            console.log('No cases matched to update the funds. Incomplete of badly formatted information provided');
            break;

    }

    res.status(201).json(updatedFunds);


}

module.exports = { getFunds, updateFunds }