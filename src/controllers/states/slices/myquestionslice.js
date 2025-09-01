import { createSlice } from "@reduxjs/toolkit";
import { useRef } from "react";

const questions = {
    questions: []
};


const myQuestionsSlice = createSlice({
    initialState: questions,
    name: 'myquestions',
    reducers:{
        updateQuestions: (state, val) => {
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

export const { append, init, updateQuestions } = myQuestionsSlice.actions

export default myQuestionsSlice.reducer;