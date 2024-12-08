import { User } from "../dto/types.dto";
import type { EnvDto } from "../dto/env.dto";
import { WithDBTimestamps } from "./utils";
import type { Subjects, Actions } from "../config/types/abilities";
import type { MongoQuery, MongoAbility } from "@casl/ability";

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
      domainValidator: (
        domain: string
      ) => Promise<readonly [Error] | readonly [null, string[]]>;
    }
    namespace Multer {
      interface File {
        hash: string;
      }
    }
    interface Request {
      user?: WithDBTimestamps<User>;
      userAbility?: MongoAbility<[Actions, Subjects], MongoQuery>;
    }
  }
}
