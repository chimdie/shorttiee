import { oapi } from "../config/docs.config";
import { FacilityDto, CreateFacilityDto } from "../dto/facility.dto";
import { dtoToJsonSchema } from "../utils/dto-to-jsonschema";

oapi.component("schemas", "FacilityDto", dtoToJsonSchema(FacilityDto));
oapi.component(
  "schemas",
  "CreateFacilityDto",
  dtoToJsonSchema(CreateFacilityDto)
);

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
