import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

const sidebarState = {
    show: window.innerWidth > 900,
    idx: 0,
};


const sidebarSlice = createSlice({
    initialState: sidebarState,
    name: 'sidebar',
    reducers:{
        toggle: (state) => {
            state.show = !state.show;
        }
    }
});

export const { toggle } = sidebarSlice.actions

export default sidebarSlice.reducer