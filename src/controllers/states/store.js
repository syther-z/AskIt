import { configureStore } from "@reduxjs/toolkit";
import  sidebarSlice  from './slices/sidebarslice.js';
import highLight from './slices/sidebarhighlight.js';
import userDetail from './slices/userdetail.js';
import myQuestions from './slices/myquestionslice.js';
import alertSlice from './slices/alertslice.js';
import loadingSlice from './slices/loadingslice.js';
import myQuestionsSlice from './slices/myquestionslice.js';
import homeFeedSlice from './slices/homefeed.js';
const store = configureStore({
    reducer:{
       sidebar: sidebarSlice,
       highlight: highLight,
       userDetail: userDetail,
       myQuestions: myQuestions,
       alertMessage: alertSlice,
       loadingSlice: loadingSlice,
       myQuestions: myQuestionsSlice,
       homeFeed: homeFeedSlice

    }
});


export default store;