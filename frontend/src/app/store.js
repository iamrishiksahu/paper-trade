import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import chartReducer from '../features/overview/chartFeatures'
import authReducer from '../features/auth/authState'
import orderReducer from '../features/orders/orderState'
import orderWindowReducer from '../features/orderWindowState'
import positionsReducer from '../features/positions/positionsState'
import watchListReducer from '../features/watchlist/watchlistState'

const store = configureStore({
    reducer: {
        orderWindow: orderWindowReducer,
        chartData: chartReducer,
        authData: authReducer,
        ordersData: orderReducer,
        positionsData: positionsReducer,
        watchListData: watchListReducer,
        
    },
    devTools: process.env.REACT_APP_ENV == "DEVELOPMENT"
    
})

setupListeners(store.dispatch);


export default store;