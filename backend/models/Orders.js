const mongooese = require('mongoose');

const ordersModel = mongooese.Schema({

    email: {
        type: String,
        required: true,
    },
    accountNumber: Number,


    orders: [
        {
            scriptName: String,
            qty: Number,
            avgCost: Number,
            createdAt: {
                type: Date,
                default: Date.now()
            },
            orderStatus: String,
            // orderPrice: Number,
            orderValidity: String,
            positionType: {
                type: String,
                default: 'BUY'
            },
            transactionType: String,
            orderType: String
        }

    ],



    schema_version: {
        type: Number,
        default: 2
    }



})

module.exports = mongooese.model('order', ordersModel);



