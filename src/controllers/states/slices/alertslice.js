import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "Default",
  sign: 0, // 0 = no icon, 1 = success, 2 = error
};

const alertSlice = createSlice({
  name: "alertslice",
  initialState,
  reducers: {
    setAlertMessage: (state, action) => {
      state.message = action.payload.message;
      state.sign = action.payload.sign;
    },
    resetAlertMessage: () => initialState, // reset back to default
  },
});

export const { setAlertMessage, resetAlertMessage } = alertSlice.actions;

export default alertSlice.reducer;
