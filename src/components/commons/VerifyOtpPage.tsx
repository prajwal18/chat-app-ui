import React, { FC } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

interface IVerifyOtpPage {
  formik: any,
  handleGoToResendOtp: () => void;
}

const VerifyOtpPage: FC<IVerifyOtpPage> = ({ formik, handleGoToResendOtp }) => {
  return (
    <>
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
        <Button type="button" variant="outlined" onClick={handleGoToResendOtp}>
          Got to resend OTP
        </Button>
        <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
          Verify
        </Button>
      </Stack>
    </>
  );
};

export default VerifyOtpPage;
