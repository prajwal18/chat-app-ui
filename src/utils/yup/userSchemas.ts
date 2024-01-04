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
