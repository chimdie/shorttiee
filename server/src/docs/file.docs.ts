import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { oapi } from "../config/docs.config";
import { Equals } from "../types/utils";
import { typeAssert } from "../utils/asserts";
import { CreateFileDocDto } from "../dto/file.dto";

export const CreateFileDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["files"] as const,
  properties: {
    files: {
      type: "array",
      items: {
        type: "string",
        format: "binary"
      }
    }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "CreateFileDto", CreateFileDocSchema);
typeAssert<Equals<FromSchema<typeof CreateFileDocSchema>, CreateFileDocDto>>();

oapi.component("schemas", "CreateFileResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      type: "object",
      additionalProperties: false,
      required: ["path", "checksum"],
      properties: {
        path: { type: "string", format: "uri" },
        checksum: {
          type: "string",
          pattern: "^\\w{64}"
        }
      }
    }
  }
});

export const createFileDoc = oapi.path({
  tags: ["File"],
  description: "Create a File",
  summary: "Create a File",
  security: [{ BearerAuth: [] }],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          $ref: "#/components/schemas/CreateFileDto"
        }
      }
    }
  },
  responses: {
    201: {
      description: "File created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateFileResponse"
          }
        }
      }
    }
  }
});

oapi.component("schemas", "GetFileResponse", {
  type: "string",
  format: "binary",
  additionalProperties: false
});
export const getFileDoc = oapi.path({
  tags: ["File"],
  description: "Get all categories",
  summary: "Get all categories",
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/octet-stream": {}
      }
    }
  }
});
