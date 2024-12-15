import dotenv from "dotenv";
import { EnvDto } from "../dto/env.dto";

const _env = {};
dotenv.config({ path: getProcessEnvironmentFile(), processEnv: _env });

function getProcessEnvironmentFile() {
  if (!process.env.NODE_ENV) {
    return ".env";
  }

  return `.env.${process.env.NODE_ENV}`;
}

// zod verify env
const parsed = EnvDto.safeParse(_env);
if (parsed.error) {
  console.error("Invalid environment variables");
  process.exit(1);
}

const configEnv: EnvDto = parsed.data;

export let appEnv = configEnv;
