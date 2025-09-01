import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";
import { sidebarOptions } from "../../staticpaths";

const highlight = {
    idx: sidebarOptions.findIndex(opt => opt.path === window.location.pathname) ?? 0
};


const sidebarHighlight = createSlice({
    initialState: highlight,
    name: 'highlight',
    reducers:{
        update: (state, nIdx) => {
            state.idx = nIdx.payload;
        }
    }
});

export const { update } = sidebarHighlight.actions

export default sidebarHighlight.reducer