const baseURL = 'http://localhost:3000'

type IdType = number | string

export const endpoints = {
  auth: {
    login: baseURL + "/auth/login",
    forgotPassword: baseURL + "/auth/forgot-password",
  },

  user: {
    users: baseURL + "/users",
    userFn: (id:number|string) => `${baseURL}/users/${id}`,
    changePasswordFn: (id: IdType) => `${baseURL}/users/${id}/change-password`,
  },

  message: {
    getAConversationFn: (id: IdType) => `${baseURL}/messages/conversation/${id}`,
    create: baseURL + "/messages"
  },

  otp: {
    verifyOtp: baseURL + "/otp/verify-otp",
    verifyUser: baseURL + "/otp/verify-user",
    getOtp: baseURL + "/otp/get",
  },
};
