import { createSlice } from "@reduxjs/toolkit"

const initialState= []

export const positionSlice = createSlice({
    name: 'positionsData',
    initialState,
    reducers: {
        setPositions: (state, action) => {
            
            state.length = 0;
            action.payload.map((item) => {
                state.push(item);
            })

        },
        addNewPosition: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const { setPositions, addNewPosition } = positionSlice.actions;
export default positionSlice.reducer;