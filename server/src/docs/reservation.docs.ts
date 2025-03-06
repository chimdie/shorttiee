import { oapi } from "../config/docs.config";
import {
  CreateReservationDto,
  ReservationWithUserAndListingDto,
  ReservationDto
} from "../dto/reservation.dto";
import { BasicQueriesDocs } from "./query.docs";
import { dtoToJsonSchema } from "../utils/dto-to-jsonschema";

oapi.component("schemas", "ReservationDto", dtoToJsonSchema(ReservationDto));
oapi.component(
  "schemas",
  "ReservationWithUserAndListingDto",
  dtoToJsonSchema(ReservationWithUserAndListingDto)
);

oapi.component(
  "schemas",
  "CreateReservationDto",
  dtoToJsonSchema(CreateReservationDto)
);

oapi.component("schemas", "CreateReservationsResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: {
      type: "string",
      example: "Successful"
    },
    data: {
      $ref: "#/components/schemas/ReservationDto"
    }
  }
});
export const createReservationsDocs = oapi.path({
  tags: ["Reservation"],
  operationId: "CreateReservation",
  security: [{ BearerAuth: [] }],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/CreateReservationDto"
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
oapi.component("schemas", "GetAllReservationResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: { type: "string" },
    data: {
      type: "array",
      items: {
        $ref: "#/components/schemas/ReservationDto"
      }
    }
  }
});
export const getAllReservationsDocs = oapi.path({
  tags: ["Reservation"],
  parameters: [...BasicQueriesDocs],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetAllReservationResponse"
          }
        }
      }
    }
  }
});

// get a reservation
oapi.component("schemas", "GetReservationResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: { type: "string" },
    data: { $ref: "#/components/schemas/ReservationWithUserAndListingDto" }
  }
});
export const getReservationDocs = oapi.path({
  tags: ["Reservation"],
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/GetReservationResponse"
          }
        }
      }
    }
  }
});
