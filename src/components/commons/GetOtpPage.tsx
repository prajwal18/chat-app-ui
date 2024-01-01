import { FC } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

interface IGetOtpPage {
  formik: any;
  handleGotOtp: () => void;
}
const GetOTPPage: FC<IGetOtpPage> = ({ formik, handleGotOtp }) => {
  return (
    <>
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
        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Get OTP
        </Button>
      </Stack>
    </>
  );
};

export default GetOTPPage;
