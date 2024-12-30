import { oapi } from "../config/docs.config";

oapi.component("securitySchemes", "BearerAuth", {
  description: "JWT authentication",
  type: "http",
  scheme: "bearer"
});

// error models
oapi.component("schemas", "NotFound", {
  type: "object",
  required: ["message", "error"],
  properties: {
    message: { type: "string" },
    error: { type: "string" }
  }
});
oapi.component("schemas", "ValidationError", {
  type: "object",
  required: ["message", "error"],
  properties: {
    message: { type: "string" },
    error: { type: "string" }
  }
});
oapi.component("schemas", "BadRequest", {
  type: "object",
  required: ["message", "error"],
  properties: {
    message: { type: "string" },
    error: { type: "string" }
  }
});
oapi.component("schemas", "Forbidden", {
  type: "object",
  required: ["message", "error"],
  properties: {
    message: { type: "string" },
    error: { type: "string" }
  }
});
oapi.component("schemas", "Unauthorized", {
  type: "object",
  required: ["message", "error"],
  properties: {
    message: { type: "string" },
    error: { type: "string" }
  }
});
oapi.component("schemas", "ServerError", {
  type: "object",
  required: ["message", "error"],
  properties: {
    message: { type: "string" },
    error: { type: "string" }
  }
});
