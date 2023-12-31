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

module.exports = { getAllOrders, createNewOrder }