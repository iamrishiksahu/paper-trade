const mongoose = require('mongoose');


const constantsSchema = mongoose.Schema({


}, {strict: false})

module.exports = mongoose.model('constant', constantsSchema);