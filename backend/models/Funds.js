const mongooese = require('mongoose');

const fundsModel = mongooese.Schema({

    email: {
        type: String,
        required: true,
    },
    accountNumber: Number,


    fundsInfo: {
        available_funds: {
            type: Number,
            default: 1000000.00
        },
        lien_amount: {
            type: Number,
            default: 0.00
        },
        margin_allowed: {
            type: Number,
            default: 1.0
        },
    },  

    schema_version: {
        type: Number,
        default: 1
    }



})

module.exports = mongooese.model('fund', fundsModel);