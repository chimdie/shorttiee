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
  settings: "/settings",
  payment: "/payments",
};

export type AuthRoutes = (typeof AuthRoutes)[keyof typeof AuthRoutes];

export type DashboardRoutes = (typeof DashboardRoutes)[keyof typeof DashboardRoutes];
