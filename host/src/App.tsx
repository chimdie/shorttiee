import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes, DashboardRoutes } from "@/types/routes";

// layouts
import AuthLayout from "@/layouts/Auth.layout";
import DashboardLayout from "@/layouts/Dashboard.layout";

// Auth pages
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Otp from "@/pages/Auth/Otp";
import ChangePassword from "@/pages/Auth/ChangePassword";

// Dashboard pages
import Home from "@/pages/Home";
import Shortlet from "@/pages/Shortlet";
import Settings from "@/pages/Settings/index";
import ShortletDetails from "@/pages/Shortlet/shortletDetails";
import EditShortlet from "@/pages/Shortlet/editShortlet";
import Profile from "@/pages/Profile";
import Notification from "@/pages/Notification";
import Reservation from "@/pages/Reservation";

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
      { path: AuthRoutes.changePassword, element: <ChangePassword /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: DashboardRoutes.home, element: <Home /> },
      { path: DashboardRoutes.shortlets, element: <Shortlet /> },
      { path: DashboardRoutes.shortletDetail, element: <ShortletDetails /> },
      { path: DashboardRoutes.editShortlet, element: <EditShortlet /> },
      { path: DashboardRoutes.settings, element: <Settings /> },
      { path: DashboardRoutes.account, element: <Profile /> },
      { path: DashboardRoutes.notifications, element: <Notification /> },
      { path: DashboardRoutes.reservations, element: <Reservation /> },
    ],
  },
]);
