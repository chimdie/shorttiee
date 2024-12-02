import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes, DashboardRoutes } from "@/types/routes";

// layouts
import AuthLayout from "@/layouts/Auth.layout";
import DashboardLayout from "./layouts/Dashboard.layout";

// Auth pages
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Otp from "@/pages/Auth/Otp";
import ResetPassword from "@/pages/Auth/ResetPassword";

// Dashboard pages
import Home from "@/pages/Dashboard/Home";
import Shortlet from "@/pages/Dashboard/Shortlet";
import Payments from "@/pages/Dashboard/Payments";
import Settings from "@/pages/Dashboard/Settings/index";
import ShortletDetails from "@/pages/Dashboard/Shortlet/shortletDetails";
import EditShortlet from "@/pages/Dashboard/Shortlet/editShortlet";
import Account from "./pages/Dashboard/Account";
import Notification from "./pages/Notification";

import NotFound from "@/components/NotFound";

export const rootRouter = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: AuthRoutes.login, element: <Login /> },
      { path: AuthRoutes.createAccount, element: <SignUp /> },
      { path: AuthRoutes.forgotPassword, element: <ForgotPassword /> },
      { path: AuthRoutes.verifyOtp, element: <Otp /> },
      { path: AuthRoutes.resetPassword, element: <ResetPassword /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: DashboardRoutes.home, element: <Home /> },
      { path: DashboardRoutes.shortlets, element: <Shortlet /> },
      { path: DashboardRoutes.shortletDetail, element: <ShortletDetails /> },
      { path: DashboardRoutes.editShortlet, element: <EditShortlet /> },
      { path: DashboardRoutes.payment, element: <Payments /> },
      { path: DashboardRoutes.settings, element: <Settings /> },
      { path: DashboardRoutes.account, element: <Account /> },
      { path: DashboardRoutes.notification, element: <Notification /> },
    ],
  },
]);
