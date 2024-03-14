const Funds = require("../../models/Funds");
const Orders = require("../../models/Orders");
const Positions = require('../../models/Positions');

const getAllOrders = async (req, res) => {

    const email = req.email;

    if (!email) {
        return res.status(400).json({ message: 'BAD_REQUEST', msg: 'email not present in the request' });
    }

    const orderAccount = await Orders.find({ email: email }).exec();

    if (!orderAccount) {
        return res.status(201).json({ message: 'NO_ORDER_ACCOUNT_FOUND' });
    }

    const ordersList = orderAccount[0].orders;

    if (!ordersList) {
        return res.status(201).json({ message: 'NO_ORDERS_FOUND' });
    }

    res.status(201).json({ ordersList });
}


const createNewOrder = async (req, res) => {

    const email = req.email;
    const data = req.body.payload;

    if (!email) {
        return res.status(401).json({ message: 'UNAUTHORIZED', msg: 'email not present in the request' });
    }

    const fundsAccount = await Funds.findOne({ email: email }).exec();
    if (!fundsAccount) {
        return res.status(201).json({ message: 'NO_FUNDS_ACCOUNT_FOUND' });
    }

    const requiredMargin = data.avgCost * data.qty
    const available_funds = fundsAccount?.fundsInfo?.available_funds
    if(requiredMargin > fundsAccount?.fundsInfo?.available_funds){
        return res.status(402).json({message: 'INSUFFICIENT_FUNDS', available_funds: available_funds, required_margin: requiredMargin })
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

    // Check for existing position

    const idx = positionAccount.positions.findIndex(item => item.scriptName == data.scriptName)

    if(idx == -1){
            const newPosition = {
                scriptName: data.scriptName,
                qty: data.qty,
                avgCost: data.avgCost,
                purchasedAt: Date.now(),
                ltp: data.avgCost,
                soldAt: null,
            }
        
            positionAccount.positions.push(newPosition)
    }else{
        const position = positionAccount.positions[idx]
        position.avgCost = Math.round((position.avgCost*position.qty + data.avgCost*data.qty) *100 / (position.qty + data.qty))/100
        position.qty += data.qty
        positionAccount.positions[idx] = position
    }

    // deducting funds
    fundsAccount.fundsInfo.available_funds -= requiredMargin

    try {
        await fundsAccount.save();
        await positionAccount.save();
        
        orderAccount.orders.push({...newOrder, orderStatus: 'COMPLETED'})

    } catch (err) {
        console.error(err)
    }



    const updatedOrderAccount = await orderAccount.save();

    res.status(201).json({ message: 'ORDER_CREATED', data: updatedOrderAccount })





}

module.exports = { getAllOrders, createNewOrder }