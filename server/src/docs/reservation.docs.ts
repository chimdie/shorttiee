import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { oapi } from "../config/docs.config";
import { CreateReservationDto, ReservationDto } from "../dto/reservation.dto";
import { Equals } from "../types/utils";
import { typeAssert } from "../utils/asserts";
import { BasicQueriesDocs } from "./query.docs";

export const ReservationDocSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "id",
    "code",
    "amount",
    "startDate",
    "endDate",
    "userId",
    "listingId",
    "listingOwnerId"
  ] as const,
  properties: {
    id: { type: "string", format: "uuid" },
    code: { type: "string" },
    amount: { type: "number" },
    startDate: { type: "string", format: "date" },
    endDate: { type: "string", format: "date" },

    // references
    userId: { type: "string", format: "uuid" },
    listingId: { type: "string", format: "uuid" },
    listingOwnerId: { type: "string", format: "uuid" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "ReservationDto", ReservationDocSchema);
typeAssert<Equals<FromSchema<typeof ReservationDocSchema>, ReservationDto>>();

export const CreateReservationDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["startDate", "endDate", "listingId"] as const,
  properties: {
    startDate: { type: "string", format: "date" },
    endDate: { type: "string", format: "date" },
    listingId: { type: "string", format: "uuid" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "CreateReservationDto", CreateReservationDocSchema);
typeAssert<
  Equals<FromSchema<typeof CreateReservationDocSchema>, CreateReservationDto>
>();
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

// get a lising
// oapi.component("schemas", "GetListingResponse", {
//   type: "object",
//   additionalProperties: false,
//   required: ["data", "message"],
//   properties: {
//     message: { type: "string" },
//     data: { $ref: "#/components/schemas/ListingsDto" }
//   }
// });
// export const getListingsDocs = oapi.path({
//   tags: ["Listing"],
//   responses: {
//     200: {
//       description: "Success",
//       content: {
//         "application/json": {
//           schema: {
//             $ref: "#/components/schemas/GetListingResponse"
//           }
//         }
//       }
//     }
//   }
// });
//
// // get listing facilities
// export const getListingFacilitiesDocs = oapi.path({
//   tags: ["Listing"],
//   responses: {
//     200: {
//       description: "Success",
//       content: {
//         "application/json": {
//           schema: {
//             type: "array",
//             items: {
//               $ref: "#/components/schemas/FacilityDto"
//             }
//           }
//         }
//       }
//     }
//   }
// });
