import { FC } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectSession } from "../redux/slice/sessionSlice";
import { Container, Typography } from "@mui/material";

interface IProtectedRoute {
  children: JSX.Element;
}
const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const currentSession = useSelector(selectSession);

  if (currentSession.isLoggedIn) {
    return children;
  } else {
    return <RerouteToLoginComponent />;
  }
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
