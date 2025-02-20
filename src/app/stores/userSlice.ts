import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserValues } from "../models/user";
import { createAppAsyncThunk } from "./hooks";
import agent from "../api/agent";

export interface UserState {
  loading: boolean,
  user: User | null
}

const initialState: UserState = {
  loading: false,
  user: null
};

export const userLogin = createAppAsyncThunk(
  "user/login",
  async (userValues: UserValues) =>{
    try{
      return await agent.Account.login(userValues);
    }catch(error){
      throw new Error(error as string);
    }
  }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder.addCase(userLogin.pending, (state) => {
        state.loading = true;
      }).addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload!
      })
    }
});

export const {  } = userSlice.actions;

export default userSlice.reducer;