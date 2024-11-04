import { oapi } from "./openapi.docs";
import { RegisterDocSchema, LoginDocSchema } from "./auth";

export { oapi };

oapi.component("schemas", "User", {
  type: "object",
  description: "User model",
  required: ["first_name", "last_name", "email"],
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string", uniqueItems: true },
    id: { type: "string", uniqueItems: true, format: "uuid" }
  }
});

oapi.component("schemas", "Listing", {
  type: "object",
  description: "Shorts listing",
  required: [],
  properties: {
    id: { type: "string", uniqueItems: true, format: "uuid" },
    title: { type: "string" },
    description: { type: "string" },
    address: { type: "string" },
    location: { type: "string" }
  }
});

oapi.component("schemas", "Greet", {
  type: "object",
  required: ["hello"],
  properties: {
    hello: { type: "string", example: "Hello world" }
  }
});

oapi.component("securitySchemes", "BearerAuth", {
  description: "JWT authentication",
  type: "http",
  scheme: "bearer"
});

//
oapi.component("schemas", "RegisterDto", RegisterDocSchema);
oapi.component("schemas", "LoginDto", LoginDocSchema);
