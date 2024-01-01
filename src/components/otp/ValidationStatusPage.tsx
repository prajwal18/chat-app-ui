import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/sessionSlice";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

interface IValidationStatusPage {
  isOTPValid: boolean;
  handleGoToResendOtp: () => void;
}
const ValidationStatusPage: FC<IValidationStatusPage> = ({
  isOTPValid,
  handleGoToResendOtp,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate(isLoggedIn ? "/" : "/login");
  };

  return (
    <>
      {isOTPValid ? (
        <>
          <Typography variant="h6" component="h2" mb={2}>
            Your OTP is valid and now you are verified
          </Typography>
          <Button variant="contained" onClick={handleContinue}>
            Continue
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6" component="h2">
            OTP verification failed
          </Typography>
          <Button variant="contained" onClick={handleGoToResendOtp}>
            Go Back to get Otp
          </Button>
        </>
      )}
    </>
  );
};

export default ValidationStatusPage;
