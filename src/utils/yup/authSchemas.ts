import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name cannot be empty")
    .min(5, "User name has to be at least 5 characters."),
  email: yup.string().email().required("Email cannot be empty"),
  password: yup
    .string()
    .required("Password cannot be empty")
    .min(8, "Password has to be at least 8 characters."),
  password_confirmation: yup
    .string()
    .required("Please re-type your password.")
    .oneOf([yup.ref("password")], "Password does not match."),
});


export const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email cannot be empty"),
    password: yup.string().required("Password cannot be empty")
})

export const otpSchema = yup.object().shape({
    email: yup.string().email().required("Email cannot be empty"),
    otp: yup.string()
})