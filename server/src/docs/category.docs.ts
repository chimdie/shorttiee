import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { oapi } from "../config/docs.config";
import { Equals } from "../types/utils";
import { typeAssert } from "../utils/asserts";
import { CategoryDto, CreateCategoryDto } from "../dto/category.dto";

export const CategoryDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "name"] as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    comment: { type: "string", nullable: true }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "CategoryDto", CategoryDocSchema);
typeAssert<Equals<FromSchema<typeof CategoryDocSchema>, CategoryDto>>();

export const CreateCategoryDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name"] as const,
  properties: {
    name: { type: "string" },
    comment: { type: "string", nullable: true }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "CreateCategoryDto", CreateCategoryDocSchema);
typeAssert<
  Equals<FromSchema<typeof CreateCategoryDocSchema>, CreateCategoryDto>
>();

oapi.component("schemas", "CreateCategoryResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      $ref: "#/components/schemas/CategoryDto"
    }
  }
});

export const createCategoryDoc = oapi.path({
  tags: ["Category"],
  description: "Create a category",
  summary: "Create a category",
  security: [{ BearerAuth: [] }],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/CreateCategoryDto"
        }
      }
    }
  },
  responses: {
    201: {
      description: "Category created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateCategoryResponse"
          }
        }
      }
    }
  }
});

oapi.component("schemas", "GetAllCategoryResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/CategoryDto"
      }
    }
  }
});
export const getAllCategoryDoc = oapi.path({
  tags: ["Category"],
  description: "Get all categories",
  summary: "Get all categories",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetAllCategoryResponse"
          }
        }
      }
    }
  }
});
