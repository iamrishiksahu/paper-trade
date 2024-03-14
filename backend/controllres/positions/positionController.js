const Orders = require("../../models/Orders");
const Positions = require('../../models/Positions');

const getAllPositions = async (req, res) => {

    const email = req.email;

    if (!email) {
        return res.status(400).json({ message: 'BAD_REQUEST', msg: 'email not present in the request' });
    }

    

    const positionsAccount = await Positions.findOne({ email: email }).exec();

    if (!positionsAccount) {
        return res.status(201).json({ message: 'NO_POSITIONS_ACCOUNT_FOUND' });
    }

    const positionsList = positionsAccount.positions;

    if (!positionsList) {
        return res.status(201).json({ message: 'NO_POSITIONS_FOUND' });
    }

    res.status(200).json({ positionsList });
}


const createNewOrder = async (req, res) => {

    const email = req.email;
    const data = req.body.payload;

    if (!email) {
        return res.status(401).json({ message: 'UNAUTHORIZED', msg: 'email not present in the request' });
    }

    const orderAccount = await Orders.findOne({ email: email }).exec();
    const positionAccount = await Positions.findOne({ email: email }).exec();

    if (!orderAccount) {
        return res.status(201).json({ message: 'NO_ORDER_ACCOUNT_FOUND' });
    }
    if (!positionAccount) {
        return res.status(201).json({ message: 'NO_POSITIONS_ACCOUNT_FOUND' });
    }


    const newOrder = {
        scriptName: data.scriptName,
        qty: data.qty,
        avgCost: data.avgCost,
        createdAt: Date.now(),
        orderStatus: data.orderStatus,
        orderValidity: 4002,
        positionType: 5002,
        transactionType: data.transactionType,
        orderType: data.orderType
    }

    const newPosition = {
        scriptName: data.scriptName,
        qty: data.qty,
        avgCost: data.avgCost,
        purchasedAt: Date.now(),
        soldAt: null,
    }


    console.log(newOrder)

    positionAccount.positions.push(newPosition)

    try {

        const updatedPosition = await positionAccount.save();
        orderAccount.orders.push({...newOrder, orderStatus: 'COMPLETED'})

    } catch (err) {
        console.error(err)
    }



    const updatedOrderAccount = await orderAccount.save();

    res.status(201).json({ message: 'ORDER_CREATED', data: updatedOrderAccount })





}

const updateSinglePositions = async (req, res) => {

    
    const email = req.email;

    if (!email) {
        return res.status(400).json({ message: 'BAD_REQUEST', msg: 'email not present in the request' });
    }

    try{

    
    
    const positionsAccount = await Positions.findOne({ email: email }).exec();

    if (!positionsAccount) {
        return res.status(201).json({ message: 'NO_POSITIONS_ACCOUNT_FOUND' });
    }

    const positionsList = positionsAccount.positions;

    if (!positionsList) {
        return res.status(201).json({ message: 'NO_POSITIONS_FOUND' });
    }


    const itemIdx = positionsList.findIndex(item => item.scriptName ==  req.body.scriptName);
    positionsList[itemIdx].qty = req.body.qty
    positionsList[itemIdx].ltp = req.body.ltp

    positionsAccount.positions = positionsList


    await positionsAccount.save()

    res.status(201).json({data: 'Successfully Updated!'})



}catch(err){
    console.log(err)
    res.status(500).json({err})
}
    



}

module.exports = { getAllPositions, updateSinglePositions }