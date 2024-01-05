import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  old_password: yup
    .string()
    .required("Old Password cannot be empty")
    .min(8, "Password has to be at least 8 characters."),
  new_password: yup
    .string()
    .required("Please type your new password.")
    .min(8, "Password has to be at least 8 characters.")
    .notOneOf(
      [yup.ref("old_password")],
      "Old and new password cannot be the same"
    ),
});

export type EditUserType = {
  name: string;
  email: string;
  profile_picture: string;
};

export const editUserSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name cannot be empty")
    .min(5, "User name has to be at least 5 characters."),
  email: yup.string().email().required("Email cannot be empty"),
});
