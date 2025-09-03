import { createSlice } from "@reduxjs/toolkit";

const tempData = {
    username: 'Guest',
    email: 'Login',
    following: [],
    followers: []
}

const userDetailSlice = createSlice({
    initialState: tempData,
    name: 'userSlice',
    reducers:{
        update: (state, data) => {
            state.username = data.payload.username;
            state.email = data.payload.email;
        },

        updateFollow: (state, data) => {
            state.followers = data.payload.followers;
            state.following = data.payload.following;
        }
    }
});

export const { update, updateFollow } = userDetailSlice.actions;
export default userDetailSlice.reducer;