import { Route, Routes } from "react-router-dom";
import ChatApp from "../components/chat-app/ChatApp";
import SignUpPage from "../components/login-signup/SignUpPage";
import LoginPage from "../components/login-signup/LoginPage";
import NotFound from "../components/404";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../components/forgot-password/ForgotPassword";
import PublicOnlyRoute from "./PublicOnlyRoute";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignUpPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatApp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
