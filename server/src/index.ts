import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import debug from "debug";
import { ErrorResponse, NotFoundResponse } from "./utils/response";
import type { Request, Response } from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/v1/api", router);

app.use("*", (_, res) => {
  return NotFoundResponse(res);
});

app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  debug("app:error")(err.message);
  debug("app:error")(err);
  return ErrorResponse(res, err.message);
});

app.listen(process.env.PORT ?? 3000);
