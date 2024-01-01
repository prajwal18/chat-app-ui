import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/slice/sessionSlice";

interface IPublicOnlyRoute {
  children: JSX.Element;
}
const PublicOnlyRoute: FC<IPublicOnlyRoute> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn){
      navigate("/")
    }
  }, [isLoggedIn])

  return children;
};

export default PublicOnlyRoute;
