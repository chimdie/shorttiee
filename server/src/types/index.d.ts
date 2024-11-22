import { User } from "../dto/types.dto";
import type { EnvDto } from "../dto/env.dto";
import { WithDBTimestamps } from "./utils";

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends EnvDto { }
  }

  namespace Express {
    interface Request {
      user?: WithDBTimestamps<User>;
    }
  }
}
