const mongoose = require('mongoose');

const positionsAccount = mongoose.Schema({


    email: {
        type: String,
        required: true,
    },
    accountNumber: Number,
    positions: [{

        scriptName: String,
        avgCost: Number,
        ltp: Number,
        purchasedAt: Date,
        soldAt: Date,
        qty: Number

    }],
    

    
    schema_version: {
        type: Number,
        default: 1
    }


})


module.exports = mongoose.model('position', positionsAccount);
