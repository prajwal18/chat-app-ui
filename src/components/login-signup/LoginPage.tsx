import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/yup/authSchemas";
import { LoginDataType, login } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { setSession } from "../../redux/slice/sessionSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomPasswordField from "../form/CustomPasswordField";

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {"Chat App "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginPage = () => {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          {/* Login Form */}
          <LoginForm />
          {/* Login Form */}
        </Box>
      </Grid>
    </Grid>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: async (values: LoginDataType) => {
      login(values)
        .then((data) => {
          toast.success("You have logged in successfully.");
          dispatch(setSession(data));
          formik.setSubmitting(false);
          navigate("/");
        })
        .catch((error: any) => {
          formik.setFieldError("email", "Incorrect username or password");
          formik.setFieldError("password", "Incorrect username or password");
          formik.setSubmitting(false);
        });
    },
  });

  return (
    <Box component="form" noValidate onSubmit={formik.handleSubmit}>
      <TextField
        name="email"
        label="Email"
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
      <CustomPasswordField
        name="password"
        label="Password"
        margin="normal"
        fullWidth
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.password ? formik.errors.password : ""}
        error={formik.touched.password && Boolean(formik.errors.password)}
        disabled={formik.isSubmitting}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{ mt: 3, mb: 2 }}
      >
        Log In
      </Button>
      <FormFotter />
    </Box>
  );
};

const FormFotter = () => {
  return (
    <>
      <Grid container>
        <Grid item xs>
          <Link to="/">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link to="/signup">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </>
  );
};

export default LoginPage;
