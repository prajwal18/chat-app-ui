import axios, { HttpStatusCode } from "axios";
import { endpoints } from "../utils/endpoint";

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
  const { data, status } = await axios.post(endpoints.otp.getOtp, { email });
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Sorry cannot send OTP.");
  }
};
