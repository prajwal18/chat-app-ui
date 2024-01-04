import axios, { HttpStatusCode } from "axios";
import { endpoints } from "../utils/endpoint";
import { ChangePasswordValueType } from "../components/modals/profile/EditProfileModal";
import jwtAxios from "../utils/jwtAxios";

export const fetchUsers = async () => {
  const { data, status } = await axios.get(endpoints.user.users);
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Failed to fetch users.");
  }
};

export const fetchActiveUsers = async () => {
  const { data, status } = await axios.get(endpoints.user.users);
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Failed to fetch users.");
  }
};

export const changePassword = async (
  cpDate: ChangePasswordValueType,
  userId: number
) => {
  const { data, status } = await jwtAxios().patch(
    endpoints.user.changePasswordFn(userId),
    cpDate
  );
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Sorry cannot change password.");
  }
};
