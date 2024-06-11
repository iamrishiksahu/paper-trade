import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    open: false,
    transactionType: '',
    ltp: 0,
    exchange: '',
    scriptName: ''
}

export const orderWindowSlice = createSlice({
    name: 'orderWindow',
    initialState,
    reducers: {
        toggleOrderWindowOpen: (state, action) => {

            // console.log(state.open)
            state.open = !state.open;

            if (action.payload) {

                state.transactionType = action.payload?.transactionType
                state.scriptName = action.payload?.scriptName
                state.ltp = action.payload?.ltp
                state.exchange = action.payload?.exchange

                return state;
            }

            return state;

        }
    }
})

export const { toggleOrderWindowOpen } = orderWindowSlice.actions;
export default orderWindowSlice.reducer;