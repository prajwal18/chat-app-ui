import { FC, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OtpPage from "../components/otp/OtpPage";
import { selectSession } from "../redux/slice/sessionSlice";

interface IProtectedRoute {
  children: JSX.Element;
}
const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const currentSession = useSelector(selectSession);
  const [isInitialRender, setIsInitialRender] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsInitialRender(false);
    }, 100);
  }, []);
  return (
    <>
      {isInitialRender ? (
        <Typography>Loading...</Typography>
      ) : currentSession.isLoggedIn ? (
        <>
          {currentSession?.user && currentSession.user.is_verified ? (
            children
          ) : (
            <OtpPage />
          )}
        </>
      ) : (
        <RerouteToLoginComponent />
      )}
    </>
  );
};

const RerouteToLoginComponent = () => {
  return (
    <Container sx={{ p: "100px", width: "100%" }}>
      <Typography variant="h4">Sorry, you are logged out.</Typography>
      <Typography variant="h6">
        <Link to="/login">Go to login</Link>
      </Typography>
    </Container>
  );
};

export default ProtectedRoute;
