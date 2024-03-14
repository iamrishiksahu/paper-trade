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
        },
        updatePositions: (state, action) => {
            const idx = state.findIndex(item => item.scriptName == action.payload.scriptName)
            state[idx] = action.payload
            console.log(state)
        }
    }
})

export const { setPositions, addNewPosition, updatePositions } = positionSlice.actions;
export default positionSlice.reducer;