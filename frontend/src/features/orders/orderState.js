import { createSlice } from "@reduxjs/toolkit"

const initialState= []

export const orderSlice = createSlice({
    name: 'ordersData',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            
            state.length = 0;
            // console.log(action.payload)
            action.payload.map((item) => {
                state.push(item);
            })

            // return state;
        },
        addNewOrder: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { setOrders, addNewOrder } = orderSlice.actions;
export default orderSlice.reducer;