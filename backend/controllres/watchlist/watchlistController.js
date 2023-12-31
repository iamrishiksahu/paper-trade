const Orders = require("../../models/Orders");
const WatchList = require('../../models/Watchlist');

const getWatchlist = async (req, res) => {

    const email = req.email;

    if (!email) {
        return res.status(400).json({ message: 'BAD_REQUEST', msg: 'email not present in the request' });
    }


    const watchListAccount = await WatchList.findOne({ email: email }).exec();

    if (!watchListAccount) {
        
        return res.status(201).json({ message: 'NO_WATCHLIST_ACCOUNT_FOUND' });
    }

    const watchlist = watchListAccount.watchlist;

    if (!watchlist) {
        return res.status(201).json({ message: 'NO_WATCHLIST_FOUND' });
    }

    res.status(200).json({ watchlist });
}

const addWatchlistItem = async (req, res) => {

    const email = req.email;
    const data = req.body;

    if (!email) {
        return res.status(401).json({ message: 'UNAUTHORIZED', msg: 'email not present in the request' });
    }

    const watchListAccount = await WatchList.findOne({ email: email }).exec();

    if (!watchListAccount) {
        return res.status(201).json({ message: 'NO_WATCHLIST_ACCOUNT_FOUND' });
    }

    const newItem = {
        scriptName: data.scriptName,
        ltp: data.ltp || 0,
        exchange: data.exchange,
        tradingAllowed: data.tradingAllowed || true,
    }


    try{

        watchListAccount.watchlist.push(newItem);
        const data = await watchListAccount.save();

        res.status(201).json({message: 'ITEM_ADDED', data })
    }catch(error){
        
        res.status(500).json({message: 'INTERNAL_SERVER_ERROR', error })
        console.error(error);
    }




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

module.exports = { getWatchlist, addWatchlistItem }