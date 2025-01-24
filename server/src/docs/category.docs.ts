import { oapi } from "../config/docs.config";
import { CategoryDto, CreateCategoryDto } from "../dto/category.dto";
import { dtoToJsonSchema } from "../utils/dto-to-jsonschema";

oapi.component("schemas", "CategoryDto", dtoToJsonSchema(CategoryDto));

oapi.component(
  "schemas",
  "CreateCategoryDto",
  dtoToJsonSchema(CreateCategoryDto)
);

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
