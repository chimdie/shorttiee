import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { oapi } from "../config/docs.config";
import { Equals } from "../types/utils";
import { typeAssert } from "../utils/asserts";
import { CreateListingsDto, ListingsDto } from "../dto/listings.dto";

export const ListingsDocSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "id",
    "name",
    "address",
    "type",
    "status",
    "images",
    "userId",
    "categoryId"
  ] as const,
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    address: { type: "string", format: "email" },
    type: { type: "string", enum: ["SHORTLET", "RENTAL", "SALE"] as const },
    status: {
      type: "string",
      enum: ["AWAITING_REVIEW", "REJECTED", "APPROVED"] as const
    },

    details: { type: "string", nullable: true },
    description: { type: "string", nullable: true },
    price: { type: "number", nullable: true },
    rate: { type: "number", nullable: true },
    facilities: { type: "string", nullable: true },
    restrictions: { type: "string", nullable: true },
    images: { type: "array", items: { type: "string", format: "url" } },

    // references
    userId: { type: "string", format: "uuid" },
    categoryId: { type: "string", format: "uuid" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "ListingsDto", ListingsDocSchema);
typeAssert<Equals<FromSchema<typeof ListingsDocSchema>, ListingsDto>>();

export const CreateListingsDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "address", "type", "images", "categoryId"] as const,
  properties: {
    name: { type: "string" },
    address: { type: "string", format: "email" },
    type: { type: "string", enum: ["SHORTLET", "RENTAL", "SALE"] as const },

    details: { type: "string", nullable: true },
    description: { type: "string", nullable: true },
    price: { type: "number", nullable: true },
    rate: { type: "number", nullable: true },
    facilities: { type: "string", nullable: true },
    restrictions: { type: "string", nullable: true },
    images: { type: "array", items: { type: "string", format: "url" } },

    // references
    categoryId: { type: "string", format: "uuid" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "CreateListingsDto", CreateListingsDocSchema);
typeAssert<
  Equals<FromSchema<typeof CreateListingsDocSchema>, CreateListingsDto>
>();
