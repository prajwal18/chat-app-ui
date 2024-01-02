import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slice/sessionSlice';
import usersReducer from './slice/usersSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: usersReducer
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;