import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserValues } from "../models/user";
import { createAppAsyncThunk } from "./hooks";
import agent from "../api/agent";

export interface UserState {
  loading: boolean,
  user: User | null,
  errors: string[];
}

const initialState: UserState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")!),
  errors: []
};

export const userLogin = createAppAsyncThunk(
  "user/login",
  async (userValues: UserValues, thunkApi) =>{
    try{
      return await agent.Account.login(userValues);
    }catch(error){
      return thunkApi.rejectWithValue(error);
    }
  }
)

export const userRegister = createAppAsyncThunk(
  "user/register",
  async (userValues: UserValues, thunkApi) =>{
    try{
      return await agent.Account.register(userValues);
    }catch(error){
      return thunkApi.rejectWithValue(error);
    }
  }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.clear();
        state.user = null;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(userLogin.pending, (state) => {
        state.loading = true;
      }).addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload!
        localStorage.setItem("jwt",action.payload!.token);
        localStorage.setItem("user",JSON.stringify(action.payload!));
      })
      builder.addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.errors = [];
      }).addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload!
        localStorage.setItem("jwt",action.payload!.token);
        localStorage.setItem("user",JSON.stringify(action.payload!));
      })
      // .addCase(userRegister.rejected, (state, action: PayloadAction<string[]>) => {
      //   state.loading = false;
      //   state.errors = action.payload;
      // })
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;