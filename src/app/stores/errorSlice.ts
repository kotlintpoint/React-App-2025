import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorResponse } from "../models/error";

export interface ErrorState {
  error: ErrorResponse | null;
}

const initialState: ErrorState = {
  error: null
};

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setServerError: (state, action: PayloadAction<ErrorResponse>) => {
            state.error = action.payload
        }
    }
});

export const { setServerError } = errorSlice.actions;

export default errorSlice.reducer;