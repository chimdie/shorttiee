import { OpenAPIV3 } from "openapi-types";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto
} from "../dto/auth.dto";
import { oapi } from "../config/docs.config";
import { dtoToJsonSchema } from "../utils/dto-to-jsonschema";

// => Register
oapi.component("schemas", "RegisterDto", dtoToJsonSchema(RegisterDto));

oapi.component("schemas", "RegisterResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      allOf: [
        {
          $ref: "#/components/schemas/UserDto"
        },
        {
          type: "object",
          additionalProperties: false,
          required: ["token"],
          properties: {
            token: {
              type: "string",
              format: "jwt",
              pattern: "^[\\w-]+.[\\w-]+.[\\w-]+$"
            }
          }
        }
      ]
    }
  }
});

/**
 * @description register route documentation
 */
export const registerDoc = oapi.path({
  tags: ["Authentication"],
  description: "Create an account",
  summary: "Create an account",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/RegisterDto"
        }
      }
    }
  },
  responses: {
    201: {
      description: "Account registered",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/RegisterResponse"
          }
        }
      }
    }
  }
});

// => Login
oapi.component("schemas", "LoginDto", dtoToJsonSchema(LoginDto));
oapi.component("schemas", "LoginResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string" },
    data: {
      type: "object",
      allOf: [
        {
          $ref: "#/components/schemas/UserDto"
        },
        {
          type: "object",
          additionalProperties: false,
          required: ["token"],
          properties: {
            token: {
              type: "string",
              format: "jwt",
              pattern: "^[\\w-]+.[\\w-]+.[\\w-]+$"
            }
          }
        }
      ]
    }
  }
});

/**
 * @description login route documentation
 */
export const loginDoc = oapi.path({
  tags: ["Authentication"],
  summary: "Login",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/LoginDto"
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
            $ref: "#/components/schemas/LoginResponse"
          }
        }
      }
    }
  }
});

// => ForgotPasswordDto

oapi.component(
  "schemas",
  "ForgotPasswordDto",
  dtoToJsonSchema(ForgotPasswordDto)
);
oapi.component("schemas", "ForgotPasswordResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: {
      type: "string",
      example: "An OTP has been sent to your email"
    },
    data: { type: "string", nullable: true, default: null }
  }
});

export const forgotPasswordDocs = oapi.path({
  tags: ["Authentication"],
  summary: "Forgot password",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ForgotPasswordDto"
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
            $ref: "#/components/schemas/ForgotPasswordResponse"
          }
        }
      }
    }
  }
});

// => ResetPasswordDto

oapi.component(
  "schemas",
  "ResetPasswordDto",
  dtoToJsonSchema(ResetPasswordDto)
);
oapi.component("schemas", "ResetPasswordResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: {
      type: "string",
      example: "Password reset successful"
    },
    data: { type: "string", nullable: true, default: null }
  }
});

export const resetPasswordDocs = oapi.path({
  tags: ["Authentication"],
  summary: "Reset password",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ResetPasswordDto"
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
            $ref: "#/components/schemas/ResetPasswordResponse"
          }
        }
      }
    }
  }
});

// => ChangePasswordDto

oapi.component(
  "schemas",
  "ChangePasswordDto",
  dtoToJsonSchema(ChangePasswordDto)
);
oapi.component("schemas", "ChangePasswordResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    message: {
      type: "string",
      example: "Password changed successful"
    },
    data: { type: "string", nullable: true, default: null }
  }
} satisfies OpenAPIV3.SchemaObject);

export const changePasswordDocs = oapi.path({
  tags: ["Authentication"],
  security: [{ BearerAuth: [] }],
  description: `Change user password. This is used only by authenticated users

By default, changing password will invalidate all previously issued tokens. 
To prevent this behaviour when changing a user password, set \`reauth\` to \`false\`
  `,
  summary: "Change password",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ChangePasswordDto"
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
            $ref: "#/components/schemas/ChangePasswordResponse"
          }
        }
      }
    }
  }
});
