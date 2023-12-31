const mongoose = require('mongoose');


const TestSchema = mongoose.Schema({

    testObject: Number,

})

module.exports= mongoose.model('testing',TestSchema);