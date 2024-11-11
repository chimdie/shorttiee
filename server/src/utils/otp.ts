import nodeCrypto from "crypto";

function generateOtp(size: number = 6) {
  const otp = Array.from({ length: size })
    .map((_) => nodeCrypto.randomInt(10))
    .join("");

  const hash = nodeCrypto.createHash("sha1").update(otp).digest("hex");
  return [otp, hash] as const;
}

function verifyOtp(otp: string, hash: string) {
  const otpHash = nodeCrypto.createHash("sha1").update(otp).digest("hex");
  return otpHash === hash;
}

export const OTP = {
  generateOtp,
  verifyOtp
};
