import { Router } from "express";
import { oapi } from "../docs/openapi.docs";
import { SuccessResponse } from "../utils/response";
import { loginDoc, registerDoc } from "../docs/auth.docs";
import { loginCtl, registerCtl } from "../controllers/auth.ctl";
import { validator } from "../middlewares/validator.middleware";
import { LoginDto, RegisterDto } from "../dto/auth.dto";

export const authRouter = Router();

authRouter.post(
  "/register",
  validator({ body: RegisterDto }),
  registerDoc,
  registerCtl
);

authRouter.post("/login", validator({ body: LoginDto }), loginDoc, loginCtl);

authRouter.post(
  "/forgot-password",
  oapi.validPath({
    tags: ["Authentication"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            // email
            type: "object",
            required: ["email"],
            properties: {
              email: { type: "string", format: "email" }
            }
          }
        }
      }
    },
    responses: {}
  }),
  (_, res) => {
    SuccessResponse(res, null, 201, "An email has been sent");
  }
);

authRouter.post(
  "/reset-password",
  oapi.validPath({
    tags: ["Authentication"],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            // email
            type: "object",
            required: ["otp"],
            properties: {
              // otp: { type: "string", pattern: "\\d{6}" }
              otp: { type: "number", minimum: 100000, maximum: 999999 }
            }
          }
        }
      }
    },
    responses: {}
  }),
  (_, res) => {
    SuccessResponse(res, null, 201, "An email has been sent");
  }
);

authRouter.post(
  "/change-password",
  oapi.validPath({
    tags: ["Authentication"],
    security: [{ BearerAuth: [] }],
    description:
      "Change user password. This is used only by authenticated users",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["oldPassword", "newPassword"],
            properties: {
              oldPassword: { type: "string", minLength: 8 },
              newPassword: { type: "string", minLength: 8 }
            }
          }
        }
      }
    },
    responses: {}
  }),
  (_, res) => {
    SuccessResponse(res, null, 201, "An email has been sent");
  }
);
