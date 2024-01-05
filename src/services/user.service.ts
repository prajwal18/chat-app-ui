import axios, { HttpStatusCode } from "axios";
import { endpoints } from "../utils/endpoint";
import { ChangePasswordValueType } from "../components/modals/profile/EditProfileModal";
import jwtAxios from "../utils/jwtAxios";
import { EditUserType } from "../utils/yup/userSchemas";

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

export const editUser = async (editData: EditUserType, userId: number) => {
  const { data, status } = await jwtAxios().patch(
    endpoints.user.editUserFn(userId),
    editData
  );
  if (status === HttpStatusCode.Ok) {
    return data;
  } else {
    throw new Error("Sorry cannot change password.");
  }
};
