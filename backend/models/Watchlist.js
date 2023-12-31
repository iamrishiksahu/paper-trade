const mongooese = require('mongoose');

const watchlistModel = mongooese.Schema({

    email: {
        type: String,
        required: true,
    },
    accountNumber: Number,

    watchlist: [
        {
            scriptName: String,
            ltp: Number,
            exchange: {
                type: String,
                default: 'BSE'
            },
            tradingAllowed: Boolean
        }
    ],
    schema_version: {
        type: Number,
        default: 1
    }



})

module.exports = mongooese.model('watchlist', watchlistModel);