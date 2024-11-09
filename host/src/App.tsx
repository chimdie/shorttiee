import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "@/types/routes";

// layouts
import AuthLayout from "@/layouts/Auth.layout";

// pages
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Otp from "@/pages/Auth/Otp";
import ResetPassword from "@/pages/Auth/ResetPassword";

export const rootRouter = createBrowserRouter([
  {
    // errorElement
    element: <AuthLayout />,
    children: [
      { path: AuthRoutes.login, element: <Login /> },
      { path: AuthRoutes.createAccount, element: <SignUp /> },
      { path: AuthRoutes.forgotPassword, element: <ForgotPassword /> },
      { path: AuthRoutes.verifyOtp, element: <Otp /> },
      { path: AuthRoutes.resetPassword, element: <ResetPassword /> },
    ],
  },
]);
