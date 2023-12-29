import axios, { HttpStatusCode } from "axios";
import { endpoints } from "../utils/endpoint";

export type LoginDataType = {
  email: string;
  password: string;
};

export const login = async (credentials: LoginDataType) => {
  // const { data, status } = await axios.post(endpoints.auth.login, credentials);
  // if (status === HttpStatusCode.Ok) {
  //   return data;
  // } else {
  //   throw new Error("Sorry, login failed.");
  // }

  // Right now it just returns some data
  return {
    user: { name: "Prajwal", email: credentials.email, id: 3 },
    token: "fdifjdifjdddfjidj",
  };
};

export type SignupDataType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
export const signup = async (userInfo: SignupDataType) => {
  const { data, status } = await axios.post(endpoints.auth.signup, userInfo);
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


export const getOtp = async (email: string) => {
  const { data, status } = await axios.post(endpoints.otp.getOtp, {email});
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Sorry cannot send OTP.");
  }
}