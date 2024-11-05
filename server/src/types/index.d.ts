import type { EnvDto } from "../dto/env.dto";

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends EnvDto {}
  }
}
