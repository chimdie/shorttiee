import nodeCrypto from "crypto";
import { appEnv } from "./config-env";

function generateOtp(size: number = Number(appEnv.OTP_SIZE)) {
  const otp = Array.from({ length: size })
    .map((_) => nodeCrypto.randomInt(10))
    .join("");

  const hash = nodeCrypto.createHash("sha1").update(otp).digest("hex");
  return [otp, hash] as const;
}

function verifyOtp(otp: string, hash: string, otpTTL: Date) {
  if (otpTTL.getTime() < Date.now()) {
    return false;
  }

  const otpHash = nodeCrypto.createHash("sha1").update(otp).digest("hex");
  return otpHash === hash;
}

export const OTP = {
  generateOtp,
  verifyOtp
};
