import "../docs";
import { Router } from "express";
import { oapi } from "../docs/openapi.docs";
import { SuccessResponse } from "../utils/response";
import { docsRouter } from "./docs.routes";
import { authRouter } from "./auth.routes";

export const router = Router();

router.use("/docs", docsRouter);
router.use("/auth", authRouter);

router.get(
  "/",
  oapi.path({ responses: { 200: { description: "LGTM" } } }),
  (_req, res) => {
    return res.json({ message: "Success" });
  }
);

router.get(
  "/hi",
  oapi.validPath({
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
