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
  shortletDetail: "/shortlet/:id",
  editShortlet: "/shortlet/edit/:id",
  settings: "/settings",
  profile: "/profile",
  notifications: "/notifications",
  reservations: "/reservations",
};

export type AuthRoutes = (typeof AuthRoutes)[keyof typeof AuthRoutes];

export type DashboardRoutes = (typeof DashboardRoutes)[keyof typeof DashboardRoutes];
