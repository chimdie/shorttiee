import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { typeAssert } from "../utils/asserts";
import { oapi } from "../config/docs.config";
import { Equals, WithDBTimestamps } from "../types/utils";
import { UserDto } from "../dto/user.dto";

const UserDoc = {
  type: "object",
  description: "User model",
  additionalProperties: false,
  required: [
    "id",
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "createdAt",
    "updatedAt"
  ] as const,
  properties: {
    id: { type: "string", uniqueItems: true, format: "uuid" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", uniqueItems: true },
    mobileNumber: { type: "string" },
    businessName: { type: "string", nullable: true },
    referrerCode: { type: "string", nullable: true },
    address: { type: "string", nullable: true },
    gender: {
      type: "string",
      enum: ["M", "F"] as const,
      nullable: true
      // default: null
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  }
} satisfies OpenAPIV3.SchemaObject;
typeAssert<Equals<FromSchema<typeof UserDoc>, WithDBTimestamps<UserDto>>>();
oapi.component("schemas", "User", UserDoc);
