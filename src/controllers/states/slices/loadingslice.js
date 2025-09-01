import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false
};

const loadingSlice = createSlice({
  name: "loadingslice",
  initialState,
  reducers: {
    updateLoader: (state, val) => {
        state.show = val.payload;
    }
  },
});

export const { updateLoader } = loadingSlice.actions;

export default loadingSlice.reducer;