import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { oapi } from "../config/docs.config";
import { Equals } from "../types/utils";
import { typeAssert } from "../utils/asserts";
import { FacilityDto, CreateFacilityDto } from "../dto/facility.dto";

export const FacilityDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["id", "name", "icon"] as const,
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    icon: { type: "string" },
    color: { type: "string", nullable: true },
    comment: { type: "string", nullable: true }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "FacilityDto", FacilityDocSchema);
typeAssert<Equals<FromSchema<typeof FacilityDocSchema>, FacilityDto>>();

export const CreateFacilityDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["name", "icon"] as const,
  properties: {
    name: { type: "string" },
    icon: { type: "string" },
    color: { type: "string", nullable: true },
    comment: { type: "string", nullable: true }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "CreateFacilityDto", CreateFacilityDocSchema);
typeAssert<
  Equals<FromSchema<typeof CreateFacilityDocSchema>, CreateFacilityDto>
>();

oapi.component("schemas", "CreateFacilityResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      $ref: "#/components/schemas/FacilityDto"
    }
  }
});

export const createFacilityDoc = oapi.path({
  tags: ["Facility"],
  description: "Create a facility",
  summary: "Create a facility",
  security: [{ BearerAuth: [] }],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/CreateFacilityDto"
        }
      }
    }
  },
  responses: {
    201: {
      description: "Facility created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CreateFacilityResponse"
          }
        }
      }
    }
  }
});

oapi.component("schemas", "GetAllFacilityResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/FacilityDto"
      }
    }
  }
});
export const getAllFacilityDoc = oapi.path({
  tags: ["Facility"],
  description: "Get all facilities",
  summary: "Get all facilities",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetAllFacilityResponse"
          }
        }
      }
    }
  }
});

oapi.component("schemas", "GetFacilityResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      $ref: "#/components/schemas/FacilityDto"
    }
  }
});
export const getFacilityDoc = oapi.path({
  tags: ["Facility"],
  description: "Get all facilities",
  summary: "Get a facility",
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetFacilityResponse"
          }
        }
      }
    }
  }
});
