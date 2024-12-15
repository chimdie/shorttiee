export const AuthRoutes = {
  login: "/",
  createAccount: "/create-account",
  verifyOtp: "/otp",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;

export const DashboardRoutes = {
  home: "/dashboard",
  shortlets: "/shortlet",
  shortletDetail: "/shortlet/:id",
  editShortlet: "/shortlet/edit/:id",
  settings: "/settings",
  profile: "/profile",
  notification: "/notification",
};

export type AuthRoutes = (typeof AuthRoutes)[keyof typeof AuthRoutes];

export type DashboardRoutes = (typeof DashboardRoutes)[keyof typeof DashboardRoutes];
