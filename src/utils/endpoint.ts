const baseURL = import.meta.env.BASE_URL;

export const endpoints = {
  auth: {
    login: baseURL + "/auth/login",
    signup: baseURL + "/auth/signup",
  },
  otp: {
    verifyOtp: baseURL + "/otp/verify",
    getOtp: baseURL + "/otp/get",
  },
};
