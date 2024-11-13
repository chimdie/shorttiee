import "dotenv/config";
import { appEnv } from "./utils/config-env";
import express, { NextFunction } from "express";
import cors from "cors";
import { apiV1router } from "./routes";
import debug from "debug";
import { ErrorResponse, NotFoundResponse } from "./utils/response";
import type { Request, Response } from "express";
import { oapi } from "./docs/openapi.docs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(oapi);

app.use("/api/v1", apiV1router);

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
  console.error(err);
  return ErrorResponse(res, err.message);
});

app.listen(appEnv.PORT ?? 4000);
