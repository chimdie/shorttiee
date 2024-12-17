export const AuthRoutes = {
  login: "/",
  createAccount: "/create-account",
  verifyOtp: "/otp",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;

export const DashboardRoutes = {
  home: "/dashboard",
  shortlets: "/shortlets",
  shortletDetail: "/shortlets/:id",
  editShortlet: "/shortlets/:id/edit",
  settings: "/settings",
  account: "/account",
  notifications: "/notifications",
  reservations: "/reservations",
};

export type AuthRoutes = (typeof AuthRoutes)[keyof typeof AuthRoutes];

export type DashboardRoutes = (typeof DashboardRoutes)[keyof typeof DashboardRoutes];
