import { EnvDto } from "../dto/env.dto";
// zod verify env

let configEnv = {} as EnvDto;

function setEnv(env: EnvDto) {
  Object.assign(configEnv, env);
}

function getEnv() {
  // console.log("here", configEnv);
  return configEnv as EnvDto;
}

const env = EnvDto.safeParse(process.env);
if (env.error) {
  console.error("Invalid environment variables");
  process.exit(1);
}

setEnv(env.data);

export const appConfig = { setEnv, getEnv };
export let appEnv = configEnv;
