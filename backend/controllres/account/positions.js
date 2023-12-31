const mongooese = require('mongoose');

const positionsModel = mongooese.Schema({

    userEmail: {
        type: String,
        required: true,
    },
    accountNumber: Number,

    positions: [
        {
            scriptName: String,
            qty: Number,
            avgCost: Number,
            ltp: Number
        }
    ],  

    schema_version: {
        type: Number,
        default: 1
    }



})

module.exports = mongooese.model('position', positionsModel);