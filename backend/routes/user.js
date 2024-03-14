const express = require('express');
const router = express.Router();
const { getAccountInfo, updateAccountInfo } = require('../controllres/user/accountInfoController');
const { getPorftfolio, updatePortfolioItem, deletePorfolioItem } = require('../controllres/user/portfolioController');
const {getFunds, updateFunds} = require('../controllres/account/fundsController');
const { getAllOrders, createNewOrder
    // , deleteOrder
} = require('../controllres/orders/ordersController');
const { getAllPositions, updateSinglePositions } = require('../controllres/positions/positionController');
const { getWatchlist, addWatchlistItem } = require('../controllres/watchlist/watchlistController');

router.get('/accountinfo', getAccountInfo);
// router.post('/accountinfo/update', updateAccountInfo);

// router.get('/portfolio', getPortfolio);
// router.post('/portfolio/delete', deletePorfolioItem);
// router.post('/portfolio/update', updateAccountInfo);

router.get('/orders', getAllOrders);
router.post('/orders', createNewOrder )
// router.patch('/orders', updateOrder )
// router.delete('/orders', deleteOrder)

router.get('/positions', getAllPositions)
router.put('/positions', updateSinglePositions)

router.get('/watchlist', getWatchlist)
router.post('/watchlist', addWatchlistItem)


router.get('/funds', getFunds);
router.put('/funds', updateFunds)


// router.get('/watchlist', watchlist.controller);


module.exports = router;