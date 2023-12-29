import { Route, Routes } from "react-router-dom";
import ChatApp from "../components/chat-app/ChatApp";
import SignUpPage from "../components/login-signup/SignUpPage";
import LoginPage from "../components/login-signup/LoginPage";
import NotFound from "../components/404";
import ProtectedRoute from "./ProtectedRoute";
import OtpPage from "../components/otp/OtpPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatApp />
          </ProtectedRoute>
        }
      />
      <Route path="/test" element={<OtpPage/>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
