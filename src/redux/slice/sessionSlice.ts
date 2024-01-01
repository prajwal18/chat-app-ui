import { createSlice } from "@reduxjs/toolkit";
import {
  setSession as setSessionFN,
  clearSession as clearSessionFN,
} from "../../utils/CookieFunctions";

export type AuthUser = {
  id: number;
  email: string;
  name: string;
  is_verified: boolean;
};

type initialStateType = {
  user: AuthUser | null;
  token: string | null;
  isLoggedIn: boolean;
};

const initialState: initialStateType = {
  user: null,
  token: null,
  isLoggedIn: false,
};

// Action Types
export type sessionInfoType = {
  user: AuthUser;
  token: string;
};
type SetSessionAT = {
  type: any;
  payload: sessionInfoType;
};
// Action Types

// Thunk actions

const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {
    setSession: (state: initialStateType, action: SetSessionAT) => {
      setSessionFN(action.payload);
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      return state;
    },
    clearSession: (state: initialStateType) => {
      clearSessionFN();
      state.isLoggedIn = true;
      state.user = null;
      state.token = null;
      return state;
    },
  },
});

// Selectors
export const selectIsLoggedIn = (state: any) => {
  return state.session.isLoggedIn;
};
export const selectToken = (state: any) => {
  return state.session.token;
};
export const selectAuthUser = (state: any) => {
  return state.session.user;
};
export const selectSession = (state: any) => {
  return state.session;
}
// Selectors

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;
