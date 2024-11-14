import { FromSchema } from "json-schema-to-ts";
import { OpenAPIV3 } from "openapi-types";
import { typeAssert } from "../utils/asserts";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto
} from "../dto/auth.dto";
import { Equals } from "../types/utils";
import { oapi } from "../config/docs.config";

// => Register
export const RegisterDocSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "email",
    "password",
    "mobileNumber"
  ] as const,
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" },
    mobileNumber: { type: "string" },
    businessName: { type: "string" },
    referrerCode: { type: "string" },
    address: { type: "string" },
    gender: {
      type: "string",
      enum: ["M", "F"] as const,
      nullable: true
      // default: null
    }
  },
  additionalProperties: false
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "RegisterDto", RegisterDocSchema);
typeAssert<Equals<FromSchema<typeof RegisterDocSchema>, RegisterDto>>();

oapi.component("schemas", "RegisterResponse", {
  type: "object",
  additionalProperties: false,
  required: ["message", "data"],
  properties: {
    message: { type: "string", example: "Success" },
    data: {
      allOf: [
        {
          $ref: "#/components/schemas/User"
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
    200: {
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
export const LoginDocSchema = {
  type: "object",
  additionalProperties: false,
  required: ["email", "password"] as const,
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", format: "password" }
  }
} satisfies OpenAPIV3.SchemaObject;
oapi.component("schemas", "LoginDto", LoginDocSchema);
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
          $ref: "#/components/schemas/User"
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
typeAssert<Equals<FromSchema<typeof LoginDocSchema>, LoginDto>>();

/**
 * @description login route documentation
 */
export const loginDoc = oapi.path({
  tags: ["Authentication"],
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
const ForgotPasswordDtoSchema = {
  type: "object",
  additionalProperties: false,
  required: ["email"] as const,
  properties: {
    email: { type: "string", format: "email" }
  }
} satisfies OpenAPIV3.SchemaObject;

oapi.component("schemas", "ForgotPasswordDto", ForgotPasswordDtoSchema);
oapi.component("schemas", "ForgotPasswordResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    messsage: {
      type: "string",
      example: "An OTP has been sent to your email"
    },
    data: { type: "string", nullable: true, default: null }
  }
});
typeAssert<
  Equals<FromSchema<typeof ForgotPasswordDtoSchema>, ForgotPasswordDto>
>();

export const forgotPasswordDocs = oapi.path({
  tags: ["Authentication"],
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
const ResetPasswordDtoSchema = {
  type: "object",
  additionalProperties: false,
  required: ["otp", "email", "password"] as const,
  properties: {
    email: { type: "string", format: "email" },
    otp: { type: "string", pattern: "\\d{6}" },
    password: { type: "string", format: "password" }
  }
} satisfies OpenAPIV3.SchemaObject;

oapi.component("schemas", "ResetPasswordDto", ResetPasswordDtoSchema);
oapi.component("schemas", "ResetPasswordResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    messsage: {
      type: "string",
      example: "Password reset successful"
    },
    data: { type: "string", nullable: true, default: null }
  }
});

typeAssert<
  Equals<FromSchema<typeof ResetPasswordDtoSchema>, ResetPasswordDto>
>();

export const resetPasswordDocs = oapi.path({
  tags: ["Authentication"],
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
const ChangePasswordDtoSchema = {
  type: "object",
  additionalProperties: false,
  required: ["oldPassword", "newPassword"] as const,
  properties: {
    oldPassword: { type: "string", minLength: 8 },
    newPassword: { type: "string", minLength: 8 }
  }
} satisfies OpenAPIV3.SchemaObject;

oapi.component("schemas", "ChangePasswordDto", ChangePasswordDtoSchema);
oapi.component("schemas", "ChangePasswordResponse", {
  type: "object",
  additionalProperties: false,
  required: ["data", "message"],
  properties: {
    messsage: {
      type: "string",
      example: "Password changed successful"
    },
    data: { type: "string", nullable: true, default: null }
  }
} satisfies OpenAPIV3.SchemaObject);
typeAssert<
  Equals<FromSchema<typeof ChangePasswordDtoSchema>, ChangePasswordDto>
>();
export const changePasswordDocs = oapi.path({
  tags: ["Authentication"],
  security: [{ BearerAuth: [] }],
  description: "Change user password. This is used only by authenticated users",
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
