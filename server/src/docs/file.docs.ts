import { oapi } from "../config/docs.config";
import { CreateFileDto } from "../dto/file.dto";
import { dtoToJsonSchema } from "../utils/dto-to-jsonschema";

oapi.component("schemas", "CreateFileDto", dtoToJsonSchema(CreateFileDto));

oapi.component("schemas", "CreateFileResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      type: "array",
      additionalProperties: false,
      items: {
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
  responses: {
    200: {
      description: "Success",
      content: {
        "application/octet-stream": {}
      }
    }
  }
});
