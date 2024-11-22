import { oapi } from "../config/docs.config";

oapi.component("schemas", "Listing", {
  type: "object",
  description: "Shorts listing",
  required: ["id"],
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
