import "dotenv/config";
import express, { NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import debug from "debug";
import { ErrorResponse, NotFoundResponse } from "./utils/response";
import type { Request, Response } from "express";
import { oapi } from "./docs";
import { EnvDto } from "./dto/env.dto";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(oapi);

app.use("/api/v1", router);

app.use("*", (_, res) => {
  return NotFoundResponse(res);
});

app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  debug("app:error")(err.message);
  debug("app:error")(err);

  if (
    "validationSchema" in err &&
    "validationErrors" in err &&
    "status" in err
  ) {
    //oapi error
    res.status(err.status as number).json({
      message: err.message,
      error: "BadRequest"
    });
    return;
  }
  return ErrorResponse(res, err.message);
});

// zod verify env
if (EnvDto.safeParse(process.env).error) {
  console.error("Invalid environment variables");
  process.exit(1);
}

app.listen(process.env.PORT ?? 3000);
