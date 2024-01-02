import { Box, LinearProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/auth.service";
import { forgotPasswordSchema } from "../../utils/yup/authSchemas";
import { OTPContainer } from "../otp/OtpPage";
import GetPage from "./GetPage";
import { Pages, getPageTitle } from "./utils";
import { getOtp, verifyOtp } from "../../services/otp.service";

export type FPDataType = {
  email: string;
  otp: string;
  new_password: string;
  new_password_confirmation?: string;
};

const initialValues: FPDataType = {
  email: "",
  otp: "",
  new_password: "",
  new_password_confirmation: "",
};

const ForgotPassword = () => {
  const [page, setPage] = useState<Pages>(Pages.Enter_Email);
  const navigate = useNavigate();

  const handleGetOTP = (email: string) => {
    getOtp(email)
      .then((_data) => {
        toast.success("Otp has been successfully sent to your email.");
        formik.setSubmitting(false);
        setPage(Pages.Verify_OTP);
      })
      .catch((error: any) => {
        toast.error(error.message);
        formik.setSubmitting(false);
      });
  };

  const handleVerifyOtp = (email: string, otp: string) => {
    verifyOtp({ email, otp })
      .then((_data) => {
        toast.success("Your OTP is valid.");
        formik.setSubmitting(false);
        setPage(Pages.Reset_Password);
      })
      .catch((error: any) => {
        toast.error(error.message);
        formik.setSubmitting(false);
        formik.setFieldValue("otp", "");
      });
  };

  const handleForgotPassword = (values: FPDataType) => {
    const submitValues = {
      email: values.email,
      otp: values.otp,
      new_password: values.new_password,
    };
    console.log(submitValues)
    forgotPassword(submitValues)
      .then((_data) => {
        toast.success("Your password has been changed successfully");
        setTimeout(() => {
          formik.setSubmitting(false);
          navigate("/login");
        }, 1500);
      })
      .catch((error: any) => {
        console.log(error)
        toast.error(error.message);
        formik.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgotPasswordSchema[page],
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: async (values: FPDataType) => {
      if (page == Pages.Enter_Email) {
        handleGetOTP(values.email);
      } else if (page == Pages.Verify_OTP) {
        handleVerifyOtp(values.email, values.otp);
      } else {
        handleForgotPassword(values);
      }
    },
  });

  return (
    <OTPContainer>
      <Typography variant="h4" component="h1">
        Forgot Password - {getPageTitle(page)}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box mb={2}>
          <LinearProgress variant="determinate" value={25 + 25 * page} sx={{height: 10, borderRadius: 5}} />
        </Box>

        <GetPage
          page={page}
          formik={formik}
          setPage={setPage}
        />
      </Box>
    </OTPContainer>
  );
};

export default ForgotPassword;
