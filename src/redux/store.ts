import { configureStore } from '@reduxjs/toolkit';
import {carsReducer }from './slices/CarsSlice';
import { authReducer } from './slices/AuthSlice';
// ...

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    auth: authReducer,
  },
})

// типізація всіх states
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch