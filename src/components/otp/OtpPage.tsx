import { Box, Container, Fab, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearSession,
  selectAuthUser,
  selectIsLoggedIn,
  setUserIsVerified,
} from "../../redux/slice/sessionSlice";
import { otpSchema } from "../../utils/yup/authSchemas";
import { Pages, getPageTitle } from "./utils";
import GetPage from "./GetPage";

// MUI Icon
import LogoutIcon from "@mui/icons-material/Logout";
import { OtpDataType, getOtp, verifyUser } from "../../services/otp.service";
// MUI Icon

export const OTPContainer = ({
  children,
}: {
  children: Array<JSX.Element>;
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
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
        {children}
      </Stack>
    </Container>
  );
};

const OtpPage = () => {
  const sessionUser = useSelector(selectAuthUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [page, setPage] = useState<Pages>(Pages.Enter_Email);
  const dispatch = useDispatch();

  const handleGetOTP = (email: string) => {
    getOtp(email)
      .then((_data) => {
        toast.success("Otp has been successfully sent to your email.");
        formik.setSubmitting(false);
        setPage(Pages.Validate_OTP);
      })
      .catch((error: any) => {
        toast.error(error.message);
        formik.setSubmitting(false);
      });
  };

  const handleVerifyOtp = (values: OtpDataType) => {
    verifyUser(values)
      .then((_data) => {
        toast.success("Your OTP is valid.");
        setIsOTPValid(true);
        dispatch(setUserIsVerified());
        formik.setSubmitting(false);
        setPage(Pages.Validation_Status);
      })
      .catch((error: any) => {
        toast.error(error.message);
        formik.setSubmitting(false);
        formik.setFieldValue("otp", "");
      });
  };

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema: otpSchema,
    enableReinitialize: true,
    onSubmit: async (values: OtpDataType) => {
      if (page == Pages.Enter_Email) {
        handleGetOTP(values.email);
      } else {
        handleVerifyOtp(values);
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      formik.setFieldValue("email", sessionUser.email);
    }
  }, [isLoggedIn, sessionUser]);
  return (
      <OTPContainer>
        <Typography variant="h4" component="h1">
          OTP - {getPageTitle(page)}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <GetPage
            page={page}
            formik={formik}
            isOTPValid={isOTPValid}
            setPage={setPage}
          />
        </Box>
        <LogoutFAB />
      </OTPContainer>
  );
};

const LogoutFAB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearSession());
    navigate("/login")
  };
  return (
    <Fab
      color="warning"
      aria-label="edit"
      onClick={handleLogout}
      sx={{ position: "absolute", bottom: "-100px" }}
    >
      <LogoutIcon />
    </Fab>
  );
};

export default OtpPage;
