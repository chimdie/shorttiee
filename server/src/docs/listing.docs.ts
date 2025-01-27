import { oapi } from "../config/docs.config";
import { CreateListingsDto, ListingDto } from "../dto/listings.dto";
import { BasicQueriesDocs } from "./query.docs";
import { dtoToJsonSchema } from "../utils/dto-to-jsonschema";

oapi.component("schemas", "ListingsDto", dtoToJsonSchema(ListingDto));

oapi.component(
  "schemas",
  "CreateListingsDto",
  dtoToJsonSchema(CreateListingsDto)
);

oapi.component("schemas", "CreateListingResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: {
      type: "string",
      example: "Successful"
    },
    data: {
      $ref: "#/components/schemas/ListingsDto"
    }
  }
});
export const createListingsDocs = oapi.path({
  tags: ["Listing"],
  security: [{ BearerAuth: [] }],
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

// get all listing
oapi.component("schemas", "GetAllListingResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: { type: "string" },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/ListingsDto"
      }
    }
  }
});
export const getAllListingsDocs = oapi.path({
  tags: ["Listing"],
  parameters: [...BasicQueriesDocs],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetAllListingResponse"
          }
        }
      }
    }
  }
});

// get a lising
oapi.component("schemas", "GetListingResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: { type: "string" },
    data: { $ref: "#/components/schemas/ListingsDto" }
  }
});
export const getListingsDocs = oapi.path({
  tags: ["Listing"],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetListingResponse"
          }
        }
      }
    }
  }
});

// get listing facilities
export const getListingFacilitiesDocs = oapi.path({
  tags: ["Listing"],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              $ref: "#/components/schemas/FacilityDto"
            }
          }
        }
      }
    }
  }
});
