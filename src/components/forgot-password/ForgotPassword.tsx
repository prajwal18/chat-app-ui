import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthUser,
  selectIsLoggedIn,
} from "../../redux/slice/sessionSlice";
import { otpSchema } from "../../utils/yup/authSchemas";
import { OtpDataType, getOtp, verifyOtp } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

enum Pages {
  Get_OTP,
  Validate_OTP,
  Validation_Status,
}

const getPageTitle = (page: Pages) => {
  switch (page) {
    case Pages.Get_OTP:
      return "Get";
    case Pages.Validate_OTP:
      return "Validate";
    case Pages.Validation_Status:
      return "Validation Status";
    default:
      return "";
  }
};

const ForgotPassword = () => {
  const sessionUser = useSelector(selectAuthUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [page, setPage] = useState<Pages>(Pages.Get_OTP);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema: otpSchema,
    enableReinitialize: true,
    onSubmit: async (values: OtpDataType) => {
      if (page == Pages.Get_OTP) {
        getOtp(values.email)
          .then((data) => {
            toast.success("Otp has been successfully sent to your email.");
            formik.setSubmitting(false);
            setPage(Pages.Validate_OTP);
          })
          .catch((error: any) => {
            toast.error(error.message);
            formik.setSubmitting(false);
          });
      } else {
        verifyOtp(values)
          .then((data) => {
            toast.success("Your OTP is valid and now you are verified.");
            formik.setSubmitting(false);
            setPage(Pages.Validation_Status);
            setIsOTPValid(true);
          })
          .catch((error: any) => {
            toast.error(error.message);
            formik.setSubmitting(false);
            formik.setFieldValue("otp", "");
          });
      }
    },
  });

  useEffect(() => {
    if (page == Pages.Validation_Status && isLoggedIn) {
      // Change isVerified flag in cookie and session to true
    }
  }, [page, isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      formik.setFieldValue("email", sessionUser.email);
    }
  }, [isLoggedIn, sessionUser]);
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "200px",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        sx={{
          width: "600px",
          background: "rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "5px",
        }}
        spacing={4}
      >
        <Typography variant="h4" component="h1">
          OTP - {getPageTitle(page)}
        </Typography>
        <GetPage
          page={page}
          formik={formik}
          isOTPValid={isOTPValid}
          setPage={setPage}
        />
      </Stack>
    </Container>
  );
};

interface IGetPage {
  page: Pages;
  setPage: (value: any) => void;
  formik: any;
  isOTPValid: boolean;
}
const GetPage: FC<IGetPage> = ({ page, formik, isOTPValid, setPage }) => {
  if (page == Pages.Get_OTP) {
    return <GetOTPPage formik={formik} setPage={setPage} />;
  } else if (page == Pages.Validate_OTP) {
    return <VerifyOTPPage formik={formik} setPage={setPage} />;
  } else if (page == Pages.Validation_Status) {
    return <ValidationStatusPage isOTPValid={isOTPValid} setPage={setPage} />;
  } else {
    return <></>;
  }
};

interface IOTPPage {
  formik: any;
  setPage: (value: any) => void;
}
const GetOTPPage: FC<IOTPPage> = ({ formik, setPage }) => {
  const handleGotOtp = () => {
    setPage(Pages.Validate_OTP);
  };
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography mb={2} variant="h6">
        Enter Your Email
      </Typography>
      <TextField
        name="email"
        type="text"
        margin="normal"
        fullWidth
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.email ? formik.errors.email : ""}
        error={formik.touched.email && Boolean(formik.errors.email)}
        disabled={formik.isSubmitting}
      />
      <Stack mt={2} direction="row" justifyContent={"space-between"}>
        <Button type="button" variant="outlined" onClick={handleGotOtp}>
          Alreday Got OTP
        </Button>
        <Button type="submit" variant="contained">
          Get OTP
        </Button>
      </Stack>
    </Box>
  );
};
const VerifyOTPPage: FC<IOTPPage> = ({ formik, setPage }) => {
    const handleGotToResendOTP = () => {
        setPage(Pages.Get_OTP)
        formik.setFieldValue("otp", "")
    }
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Typography mb={2} variant="h6">
        Enter Your OTP
      </Typography>
      <TextField
        name="otp"
        type="text"
        margin="normal"
        fullWidth
        value={formik.values.otp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.otp ? formik.errors.otp : ""}
        error={formik.touched.otp && Boolean(formik.errors.otp)}
        disabled={formik.isSubmitting}
      />
      <Stack mt={2} direction="row" justifyContent={"space-between"}>
        <Button type="button" variant="outlined" onClick={handleGotToResendOTP}>
          Got to resend OTP
        </Button>
        <Button type="submit" variant="contained">
          Verify
        </Button>
      </Stack>
    </Box>
  );
};

interface IValidationStatusPage {
  isOTPValid: boolean;
  setPage: (value: any) => void;
}
const ValidationStatusPage: FC<IValidationStatusPage> = ({
  isOTPValid,
  setPage,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate(isLoggedIn ? "/" : "/login");
  };
  const handleGoBack = () => {
    setPage(Pages.Get_OTP);
  };

  return (
    <>
      {isOTPValid ? (
        <>
          <Typography variant="h6" component="h2">
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
          <Button variant="contained" onClick={handleGoBack}>
            Go Back to get Otp
          </Button>
        </>
      )}
    </>
  );
};

export default ForgotPassword;