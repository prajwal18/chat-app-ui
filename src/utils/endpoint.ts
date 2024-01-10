export const baseURL = import.meta.env.VITE_API_BASE_URL;
export const wsURL = import.meta.env.VITE_WS_URL;

type IdType = number | string;

export const endpoints = {
  auth: {
    login: baseURL + "/auth/login",
    forgotPassword: baseURL + "/auth/forgot-password",
  },

  user: {
    users: baseURL + "/users",
    editUserFn: (id: number | string) => `${baseURL}/users/${id}`,
    userFn: (id: number | string) => `${baseURL}/users/${id}`,
    changePasswordFn: (id: IdType) => `${baseURL}/users/${id}/change-password`,
  },

  message: {
    getAConversationFn: (id: IdType) =>
      `${baseURL}/messages/conversation/${id}`,
    create: baseURL + "/messages",
  },

  otp: {
    verifyOtp: baseURL + "/otp/verify-otp",
    verifyUser: baseURL + "/otp/verify-user",
    getOtp: baseURL + "/otp/get",
  },
};
