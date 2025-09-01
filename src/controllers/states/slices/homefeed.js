import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

const questions = {
    questions: []
};


const homeFeed = createSlice({
    initialState: questions,
    name: 'questions',
    reducers:{
        updateFeed: (state, val) => {
            state.questions = val.payload;
        },
        append: (state, val) => {
            state.questions.push(newState.payload);
        },
        init: (state) => {
            state.questions.length = 0;
        }
    }
});

export const { append, init, updateFeed } = homeFeed.actions;

export default homeFeed.reducer;