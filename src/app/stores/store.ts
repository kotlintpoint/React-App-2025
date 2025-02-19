
import { configureStore } from '@reduxjs/toolkit'
import activityReducer from "./activitySlice";
import errorReducer from "./errorSlice";

export const store = configureStore({
  reducer: {
    activity: activityReducer,
    error: errorReducer
  },
})

export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

