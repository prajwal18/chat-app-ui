import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import CustomPasswordField from "../form/CustomPasswordField";

interface IResetPassword {
  formik: any;
  handleGoToResendOtp: () => void;
}

const ResetPasswordPage: FC<IResetPassword> = ({ formik, handleGoToResendOtp }) => {
  return (
    <>
      <Typography mb={2} variant="h6">
        New Password
      </Typography>
      <CustomPasswordField
        name="new_password"
        margin="normal"
        fullWidth
        value={formik.values.new_password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.new_password ? formik.errors.new_password : ""}
        error={formik.touched.new_password && Boolean(formik.errors.new_password)}
        disabled={formik.isSubmitting}
      />
      <Typography mb={2} variant="h6">
        Confirm New Password
      </Typography>
      <CustomPasswordField
        name="new_password_confirmation"
        margin="normal"
        fullWidth
        value={formik.values.new_password_confirmation}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.new_password_confirmation ? formik.errors.new_password_confirmation : ""}
        error={formik.touched.new_password_confirmation && Boolean(formik.errors.new_password_confirmation)}
        disabled={formik.isSubmitting}
      />
      <Stack mt={2} direction="row" justifyContent={"space-between"}>
        <Button type="button" variant="outlined" onClick={handleGoToResendOtp} disabled={formik.isSubmitting}>
          Got to resend OTP
        </Button>
        <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default ResetPasswordPage;
