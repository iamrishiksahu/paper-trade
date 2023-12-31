import { createSlice } from "@reduxjs/toolkit"

const initialState= []

export const watchListSlice = createSlice({
    name: 'watchListData',
    initialState,
    reducers: {
        setWatchlist: (state, action) => {
            
            state.length = 0;
            action.payload.map((item) => {
                state.push(item);
            })

        },
        addNewWatchListItem: (state, action) => {
            state.push(action.payload)
        },
        delteWatchListItem: (state, action) => {
            let idx = state.indexOf(action.item);
            if(idx > -1){
                state.splice(idx, 1)
            }

        }
    }
})

export const { setWatchlist, addNewWatchListItem } = watchListSlice.actions;
export default watchListSlice.reducer;