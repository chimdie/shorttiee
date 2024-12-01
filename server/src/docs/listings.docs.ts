import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { oapi } from "../config/docs.config";
import { Equals } from "../types/utils";
import { typeAssert } from "../utils/asserts";
import { CreateListingsDto, ListingDto } from "../dto/listings.dto";

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

    description: { type: "string", nullable: true },
    price: { type: "number", nullable: true },
    rate: { type: "number", nullable: true },
    facilities: { type: "array", items: { type: "string" }, nullable: true },
    restrictions: { type: "string", nullable: true },
    images: { type: "array", items: { type: "string", format: "uri" } },

    // references
    userId: { type: "string", format: "uuid" },
    categoryId: { type: "string", format: "uuid" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "ListingsDto", ListingsDocSchema);
typeAssert<Equals<FromSchema<typeof ListingsDocSchema>, ListingDto>>();

export const CreateListingsDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "address", "type", "images", "categoryId"] as const,
  properties: {
    name: { type: "string" },
    address: { type: "string", format: "email" },
    type: { type: "string", enum: ["SHORTLET", "RENTAL", "SALE"] as const },

    description: { type: "string", nullable: true },
    price: { type: "number", nullable: true },
    rate: { type: "number", nullable: true },
    facilities: { type: "array", items: { type: "string" }, nullable: true },
    restrictions: { type: "string", nullable: true },
    images: { type: "array", items: { type: "string", format: "uri" } },

    // references
    categoryId: { type: "string", format: "uuid" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "CreateListingsDto", CreateListingsDocSchema);
typeAssert<
  Equals<FromSchema<typeof CreateListingsDocSchema>, CreateListingsDto>
>();
oapi.component("schemas", "CreateListingResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: {
      type: "string",
      example: "Password reset successful"
    },
    data: {
      $ref: "#/components/schemas/ListingsDto"
    }
  }
});
export const createListingsDocs = oapi.path({
  tags: ["Listing"],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/CreateListingsDto"
        }
      }
    }
  },
  responses: {
    201: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateListingResponse"
          }
        }
      }
    }
  }
});
