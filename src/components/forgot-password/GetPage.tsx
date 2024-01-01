import React, { FC } from "react";
import { Pages } from "./utils";
import GetOTPPage from "../commons/GetOtpPage";
import VerifyOtpPage from "../commons/VerifyOtpPage";
import ResetPasswordPage from "./ResetPasswordPage";

interface IGetPage {
  page: Pages;
  setPage: (value: any) => void;
  formik: any;
}

const GetPage: FC<IGetPage> = ({ page, formik, setPage }) => {
  const handleGotOtp = async () => {
    if (Boolean(formik.errors.email)) {
      formik.touched.email = true;
      formik.setFieldError("email", "Email cannot be empty");
    } else {
      setPage(Pages.Verify_OTP);
    }
  };
  const handleGoToResendOtp = () => {
    setPage(Pages.Enter_Email);
  };
  switch (page) {
    case Pages.Enter_Email:
      return <GetOTPPage formik={formik} handleGotOtp={handleGotOtp} />;
    case Pages.Verify_OTP:
      return (
        <VerifyOtpPage
          formik={formik}
          handleGoToResendOtp={handleGoToResendOtp}
        />
      );
    case Pages.Reset_Password:
      return (
        <ResetPasswordPage
          formik={formik}
          handleGoToResendOtp={handleGoToResendOtp}
        />
      );
    default:
      return "";
  }
};

export default GetPage;
