
import { configureStore } from '@reduxjs/toolkit'
import activityReducer from "./activitySlice";
import errorReducer from "./errorSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    activity: activityReducer,
    error: errorReducer,
    user: userReducer
  },
})

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

