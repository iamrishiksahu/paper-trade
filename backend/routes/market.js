const express = require('express');
const { searchSymbolInMarket } = require('../controllres/market/marketController');
const router = express.Router();

// ALPHA VANTAGE API REQUEST STRING SAMPLE
// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=ADANIPOWER.BSE&apikey=L76WA8BFIPQE5EMG
// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=AVAL.BSE&apikey=L76WA8BFIPQE5EMG

router.get('/symbol-search', searchSymbolInMarket)


module.exports = router