import React, { FC } from "react";
import { Pages } from "./utils";
import GetOTPPage from "../commons/GetOtpPage";
import VerifyOtpPage from "../commons/VerifyOtpPage";
import ValidationStatusPage from "./ValidationStatusPage";

interface IGetPage {
  page: Pages;
  setPage: (value: any) => void;
  formik: any;
  isOTPValid: boolean;
}
const GetPage: FC<IGetPage> = ({ page, formik, isOTPValid, setPage }) => {
  const handleGotOtp = () => {
    setPage(Pages.Validate_OTP)
  }
  const handleGoToResendOtp = () => {
    setPage(Pages.Enter_Email)
  }
  if (page == Pages.Enter_Email) {
    return <GetOTPPage formik={formik} handleGotOtp={handleGotOtp}/>;
  } else if (page == Pages.Validate_OTP) {
    return <VerifyOtpPage formik={formik} handleGoToResendOtp={handleGoToResendOtp}/>;
  } else if (page == Pages.Validation_Status) {
    return <ValidationStatusPage isOTPValid={isOTPValid} handleGoToResendOtp={handleGoToResendOtp} />;
  } else {
    return <></>;
  }
};

export default GetPage;
