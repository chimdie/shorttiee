import { oapi } from "../config/docs.config";
import { UpdateUserDto, UserDto } from "../dto/user.dto";
import { dtoToJsonSchema } from "../utils/dto-to-jsonschema";

oapi.component("schemas", "UserDto", dtoToJsonSchema(UserDto));

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

oapi.component("schemas", "UpdateUserDto", dtoToJsonSchema(UpdateUserDto));

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
