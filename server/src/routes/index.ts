import "../docs";
import { Router } from "express";
import { SuccessResponse } from "../utils/response";
import { docsRouter } from "./docs.routes";
import { authRouter } from "./auth.routes";
import { oapi } from "../config/docs.config";
import { categoryRouter } from "./category.routes";

export const apiV1router = Router();

apiV1router.use("/docs", docsRouter);
apiV1router.use("/auth", authRouter);
apiV1router.use("/categories", categoryRouter);

apiV1router.get(
  "/",
  oapi.path({
    summary: "/",
    responses: { 200: { description: "LGTM" } }
  }),
  (_req, res) => {
    return res.json({ message: "Success" });
  }
);

apiV1router.get(
  "/hi",
  oapi.path({
    summary: "Hi",
    parameters: [
      { in: "query", name: "find", required: true, schema: { type: "string" } }
    ],
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Greet"
            }
          }
        }
      }
    }
  }),
  (_req, res) => {
    const data = SuccessResponse(res, { hello: "world" });
    res.json(data);
  }
);
