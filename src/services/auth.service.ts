import axios, { HttpStatusCode } from "axios";
import { endpoints } from "../utils/endpoint";
import { FPDataType } from "../components/forgot-password/ForgotPassword";

export type LoginDataType = {
  email: string;
  password: string;
};

export const login = async (credentials: LoginDataType) => {
  const { data, status } = await axios.post(endpoints.auth.login, credentials);
  if (status === HttpStatusCode.Accepted) {
    return data;
  } else {
    throw new Error("Sorry, login failed.");
  }
};

export type SignupDataType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export const signup = async (userInfo: SignupDataType) => {
  const { data, status } = await axios.post(endpoints.user.users, userInfo);
  if (status === HttpStatusCode.Created) {
    return data;
  } else {
    throw new Error("Sorry, signup failed.");
  }
};

export const forgotPassword = async (fpData: FPDataType) => {
  const { data, status } = await axios.post(
    endpoints.auth.forgotPassword,
    fpData
  );
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Sorry cannot send OTP.");
  }
};
