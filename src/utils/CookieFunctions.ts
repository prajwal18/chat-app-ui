import Cookies from "universal-cookie";
import { SessionInfoType } from "../redux/slice/sessionSlice";

const cookie = new Cookies();

// Session will be stored in session as session_info
// JWT token will be stored in cookie as token

export const setSession = (data: SessionInfoType) => {
  cookie.set("token", data.token);
  sessionStorage.setItem("user", JSON.stringify(data.user));
};

export const getToken = () => {
  return cookie.get("token");
};

export const getSessionUser = () => {
  return JSON.parse(sessionStorage.getItem("user") || "{}");
};

export const clearSession = () => {
  cookie.remove("token");
  sessionStorage.removeItem("user");
};

export const setAuthUserIsVerified = () => {
  let user = getSessionUser();
  if (user && user.id) {
    user.is_verified = true;
    sessionStorage.setItem("user", JSON.stringify(user))
  }
};
