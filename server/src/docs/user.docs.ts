import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { typeAssert } from "../utils/asserts";
import { oapi } from "../config/docs.config";
import { Equals, WithDBTimestamps } from "../types/utils";
import { UpdateUserDto, UserDto } from "../dto/user.dto";

const UserDoc = {
  type: "object",
  description: "User model",
  additionalProperties: false,
  required: [
    "id",
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "role",
    "createdAt",
    "updatedAt"
  ] as const,
  properties: {
    id: { type: "string", uniqueItems: true, format: "uuid" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", uniqueItems: true },
    mobileNumber: { type: "string" },
    businessName: { type: "string", nullable: true },
    referrerCode: { type: "string", nullable: true },
    address: { type: "string", nullable: true },
    photo: { type: "string", nullable: true },
    role: {
      type: "string",
      enum: ["USER", "ADMIN"] as const
    },
    gender: {
      type: "string",
      enum: ["M", "F"] as const,
      nullable: true
      // default: null
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  }
} satisfies OpenAPIV3.SchemaObject;
typeAssert<Equals<FromSchema<typeof UserDoc>, WithDBTimestamps<UserDto>>>();
oapi.component("schemas", "UserDto", UserDoc);

//
oapi.component("schemas", "UserProfileResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      $ref: "#/components/schemas/UserDto"
    }
  }
});

export const getUserProfileDoc = oapi.path({
  tags: ["User"],
  description: "Get current user profile",
  summary: "Get current user profile",
  security: [{ BearerAuth: [] }],
  // requestBody: {
  //   content: {
  //     "application/json": {
  //       schema: {
  //         $ref: "#/components/schemas/CreateCategoryDto"
  //       }
  //     }
  //   }
  // },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserProfileResponse"
          }
        }
      }
    }
  }
});

//

const UpdateUserDoc = {
  type: "object",
  description: "User model",
  additionalProperties: false,
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    mobileNumber: { type: "string" },
    businessName: { type: "string", nullable: true },
    address: { type: "string", nullable: true },
    photo: { type: "string", nullable: true },
    gender: {
      type: "string",
      enum: ["M", "F"] as const,
      nullable: true
      // default: null
    }
  }
} satisfies OpenAPIV3.SchemaObject;
typeAssert<Equals<FromSchema<typeof UpdateUserDoc>, UpdateUserDto>>();
oapi.component("schemas", "UpdateUserDto", UpdateUserDoc);

export const patchUserProfileDoc = oapi.path({
  tags: ["User"],
  description: "Update current user profile",
  summary: "Update current user profile",
  security: [{ BearerAuth: [] }],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UpdateUserDto"
        }
      }
    }
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserProfileResponse"
          }
        }
      }
    }
  }
});
