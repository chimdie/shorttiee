import { Router } from "express";
import { oapi } from "../docs";
import { SuccessResponse } from "../utils/response";

export const router = Router();

router.use("/docs", oapi.swaggerui());

router.get("/", (_req, res) => {
  return res.json({ message: "Success" });
});

router.get(
  "/hi",
  oapi.validPath({
    tags: ["root"],
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
