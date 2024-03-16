import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstname: '',
    email: '',
    accessToken: '',
    roles: [],

}

export const authSlice = createSlice({
    name: 'authData',
    initialState,
    reducers: {
        setAuthData: (state, action) => {

            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.firstname = action.payload.firstname;
            state.roles = action.payload.roles;

            return state;

        },
        clearAuth: (state, action) => {
            state.email = ''
            state.accessToken = ''
            state.firstname = ''
            state.roles = []
            return state
        }
    }
})

export const { setAuthData, clearAuth } = authSlice.actions;

export default authSlice.reducer;