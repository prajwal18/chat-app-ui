import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Copyright } from "./LoginPage";
import { useFormik } from "formik";
import { signupSchema } from "../../utils/yup/authSchemas";
import { SignupDataType, signup } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/slice/sessionSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomPasswordField from "../form/CustomPasswordField";

// TODO remove, this demo shouldn't need to reset the theme.

const SignUpPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {/* Sign up form */}
        <SignupForm />
        {/* Sign up form */}
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: async (values: SignupDataType) => {
      signup(values)
        .then((data) => {
          toast.success("You have signed up successfully.");
          dispatch(setSession(data));
          formik.setSubmitting(false);
          navigate("/");
        })
        .catch((error: any) => {
          formik.setSubmitting(false);
          toast.error(error.message)
        });
    },
  });
  return (
    <Box
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Full Name"
            type="text"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name ? formik.errors.name : ""}
            error={formik.touched.name && Boolean(formik.errors.name)}
            disabled={formik.isSubmitting}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            type="text"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email ? formik.errors.email : ""}
            error={formik.touched.email && Boolean(formik.errors.email)}
            disabled={formik.isSubmitting}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomPasswordField
            name="password"
            label="Password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password ? formik.errors.password : ""}
            error={formik.touched.password && Boolean(formik.errors.password)}
            disabled={formik.isSubmitting}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomPasswordField
            name="password_confirmation"
            label="Re-Type Password"
            fullWidth
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.password_confirmation ? formik.errors.password_confirmation : ""}
            error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
            disabled={formik.isSubmitting}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      {/* Form Fotter */}
      <FormFooter />
      {/* Form Fotter */}
    </Box>
  );
};

const FormFooter = () => {
  return (
    <Grid container justifyContent="flex-end">
      <Grid item>
        <Link to="/login">
          Already have an account? Log In
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
