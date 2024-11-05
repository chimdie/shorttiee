import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { Equals } from "../types/assert";
import { User } from "../db/users.db";
import { typeAssert } from "../utils/asserts";
import { oapi } from "./openapi.docs";

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
    businessName: { type: "string" },
    referrerCode: { type: "string" },
    address: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  }
} satisfies OpenAPIV3.SchemaObject;
typeAssert<Equals<FromSchema<typeof UserDoc>, User>>();
oapi.component("schemas", "User", UserDoc);
