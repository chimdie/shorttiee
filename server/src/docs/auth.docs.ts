import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { oapi } from "./openapi.docs";
import { typeAssert } from "../utils/asserts";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { Equals } from "../types/utils";

// => Register
export const RegisterDocSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "mobileNumber"
  ] as const,
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" },
    mobileNumber: { type: "string" },
    businessName: { type: "string" },
    referrerCode: { type: "string" },
    address: { type: "string" }
  },
  additionalProperties: false
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "RegisterDto", RegisterDocSchema);
typeAssert<Equals<FromSchema<typeof RegisterDocSchema>, RegisterDto>>();

/**
 * @description register route documentation
 */
export const registerDoc = oapi.validPath({
  tags: ["Authentication"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/RegisterDto"
        }
      }
    }
  },
  responses: {
    200: {
      description: "Account registered",
      content: {
        "application/json": {
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["message", "data"],
            properties: {
              message: { type: "string", example: "Success" },
              data: {
                allOf: [
                  {
                    $ref: "#/components/schemas/User"
                  },
                  {
                    type: "object",
                    additionalProperties: false,
                    required: ["token"],
                    properties: {
                      token: {
                        type: "string",
                        format: "jwt",
                        pattern: "^[\\w-]+.[\\w-]+.[\\w-]+$"
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
});

// => Login
export const LoginDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["email", "password"] as const,
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "LoginDto", LoginDocSchema);
typeAssert<Equals<FromSchema<typeof LoginDocSchema>, LoginDto>>();

/**
 * @description login route documentation
 */
export const loginDoc = oapi.validPath({
  tags: ["Authentication"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/LoginDto"
        }
      }
    }
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["message", "data"],
            properties: {
              message: { type: "string" },
              data: {
                type: "object",
                allOf: [
                  {
                    $ref: "#/components/schemas/User"
                  },
                  {
                    type: "object",
                    additionalProperties: false,
                    required: ["token"],
                    properties: {
                      token: {
                        type: "string",
                        format: "jwt",
                        pattern: "^[\\w-]+.[\\w-]+.[\\w-]+$"
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
});
