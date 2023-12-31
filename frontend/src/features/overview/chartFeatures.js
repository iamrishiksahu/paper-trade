import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    symbol: 'SBICARD',
    exchange: 'BSE'
}

export const chartSlice = createSlice({
    name: 'chartData',
    initialState,
    reducers: {
        scriptChange: (state, action) => {
            // const chartData = action.payload
            const chartData = {
                symbol: action.payload.symbol,
                exchange: action.payload.exchange
            }
            state = chartData
            
            return state
          
        }
    }
})

export const { scriptChange } = chartSlice.actions;

export default chartSlice.reducer;