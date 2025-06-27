import type { EnvDto } from "../dto/env.dto";
import type { Subjects, Actions } from "./abilities";
import type { MongoQuery, MongoAbility } from "@casl/ability";
import type { Events } from "../config/events";
import type { EventEmitter } from "events";
import { User } from "../dto/types.dto";

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
      event: EventEmitter<Events>;
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
      user?: User;
      userAbility?: MongoAbility<[Actions, Subjects], MongoQuery>;
    }
  }
}
