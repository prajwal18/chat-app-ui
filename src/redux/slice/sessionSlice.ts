import { createSlice } from "@reduxjs/toolkit";
import {
  setSession as setSessionFN,
  clearSession as clearSessionFN,
  setAuthUserIsVerified,
} from "../../utils/CookieFunctions";

export type AuthUserType = {
  id: number;
  email: string;
  name: string;
  is_verified: boolean;
};

type initialStateType = {
  user: AuthUserType | null;
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
  user: AuthUserType;
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
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      return state;
    },
    setUserIsVerified: (state: initialStateType) => {
      if (state.user) {
        state.user.is_verified = true;
        setAuthUserIsVerified();
      }
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
};
// Selectors

export const { setSession, clearSession, setUserIsVerified } =
  sessionSlice.actions;

export default sessionSlice.reducer;
