import { createSlice } from "@reduxjs/toolkit";

const tempData = {
    username: 'Guest',
    email: 'Login'
}

const userDetailSlice = createSlice({
    initialState: tempData,
    name: 'userSlice',
    reducers:{
        update: (state, data) => {
            state.username = data.payload.username;
            state.email = data.payload.email;
        }
    }
});

export const { update } = userDetailSlice.actions;
export default userDetailSlice.reducer;