import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slice/sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;