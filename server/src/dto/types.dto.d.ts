export type Auth = {
  id: string;
  hash: string;
  userId: string;
  /**
   * a SHA1 hash of `hash`
   * useful for checking changes in the user auth
   *
   * @example invalidate all auth tokens after a password change by checking
   * the nonce in JWT
   */
  nonce: string;
  otp?: string | null;
  /** datetime */
  otpTTL?: string | null;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  businessName?: string;
  referrerCode?: string;
  address?: string;
  gender?: "M" | "F" | null;
};
