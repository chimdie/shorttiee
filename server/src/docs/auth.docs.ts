import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";

export const RegisterDocSchema = {
  type: "object",
  required: ["firstName", "lastName", "email", "password"] as const,
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" }
  },
  additionalProperties: false
} satisfies OpenAPIV3.SchemaObject;
export type RegisterDto = FromSchema<typeof RegisterDocSchema>;

export const LoginDocSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" }
  }
} satisfies OpenAPIV3.SchemaObject;
export type LoginDto = FromSchema<typeof LoginDocSchema>;
