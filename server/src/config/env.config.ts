import dotenv from "dotenv";
import { EnvDto } from "../dto/env.dto";

const _configEnv = {};
dotenv.config({ path: getProcessEnvironmentFile(), processEnv: _configEnv });

function getProcessEnvironmentFile() {
  if (!process.env.NODE_ENV) {
    return ".env";
  }

  return `.env.${process.env.NODE_ENV}`;
}

function setEnv(env: EnvDto) {
  Object.assign(_configEnv, env);
}

function getEnv() {
  return _configEnv as EnvDto;
}

// zod verify env
const env = EnvDto.safeParse(_configEnv);
if (env.error) {
  console.error("Invalid environment variables");
  process.exit(1);
}

const configEnv: EnvDto = env.data;

setEnv(env.data);

export const appConfig = { setEnv, getEnv };
export let appEnv = configEnv;
