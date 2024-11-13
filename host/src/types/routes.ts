export const AuthRoutes = {
  login: "/",
  createAccount: "/create-account",
  verifyOtp: "/otp",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;

export const DashboardRoutes = {
  home: "/dashboard/home",
  listShortLet: "/dashboard/list-shortlet",
  shortlets: "/dashboard/shortlet",
  settings: "/dashboard/settings",
};

export type AuthRoutes = (typeof AuthRoutes)[keyof typeof AuthRoutes];

export type DashboardRoutes = (typeof DashboardRoutes)[keyof typeof DashboardRoutes];
