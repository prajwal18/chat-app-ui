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

export type OtpDataType = {
  email: string;
  otp: string;
};

export const verifyOtp = async (otpInfo: OtpDataType) => {
  const { data, status } = await axios.post(endpoints.otp.verifyOtp, otpInfo);
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Incorrect OTP.");
  }
};

export const verifyUser = async (otpInfo: OtpDataType) => {
  const { data, status } = await axios.post(endpoints.otp.verifyUser, otpInfo);
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Incorrect OTP.");
  }
};


export const getOtp = async (email: string) => {
  const { data, status } = await axios.post(endpoints.otp.getOtp, {email});
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Sorry cannot send OTP.");
  }
}

export const forgotPassword = async (fpData: FPDataType) => {
  const { data, status } = await axios.post(endpoints.auth.forgotPassword, fpData)
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Sorry cannot send OTP.");
  }
}