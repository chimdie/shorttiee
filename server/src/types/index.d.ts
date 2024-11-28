import { User } from "../dto/types.dto";
import type { EnvDto } from "../dto/env.dto";
import { WithDBTimestamps } from "./utils";

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends EnvDto {}
  }

  namespace Express {
    interface Locals {
      otp: {
        generateOtp: (size?: number) => readonly [string, string];
        verifyOtp: (otp: string, hash: string, otpTTL: Date) => boolean;
        hashOtp: (payload: string) => string;
      };
    }
    namespace Multer {
      interface File {
        hash: string;
      }
    }
    interface Request {
      user?: WithDBTimestamps<User>;
    }
  }
}
