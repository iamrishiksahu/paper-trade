const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    username: {
        type: String,
        // required: true
    },
    accountNumbers: [Number],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        Admin: Number,
        Editor: Number,
        User: {
            type: Number,
            default: 5243
        },
        Customer: Number,
        Guest: Number,
        Broker: Number,
        SubBroker: Number,
        Anonymous: Number

    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },

    refreshToken: String,

    schema_version: {
        type: Number,
        default: 1
    }

});


module.exports = mongoose.model('User', userSchema);