import { Button, Container, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/slice/sessionSlice";
import { useCallback } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const handleRoute = useCallback(() => {
    navigate(isLoggedIn ? "/" : "/login");
  }, [isLoggedIn]);
  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px 100px",
      }}
    >
      <Stack sx={{ maxWidth: "600px", alignItems: "flex-start" }}>
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg"
          alt="404 error"
          style={{ width: "500px" }}
        />
        <Typography variant="h4" component="h1">
          Oops! This page could not be found
        </Typography>
        <Typography sx={{ textTransform: "uppercase", mt: "20px", mb: "50px" }}>
          Sorry but the page you are looking for does not exist. Redirect to
          some other page.
        </Typography>
        <Button variant="contained" onClick={handleRoute}>
          Go to {isLoggedIn ? 'Home': 'Login'}
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
