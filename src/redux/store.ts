import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slice/sessionSlice';
import usersReducer from './slice/usersSlice';
import conversationReducer from './slice/conversationSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    users: usersReducer,
    conversation: conversationReducer
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;