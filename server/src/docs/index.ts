import openapi from "@wesleytodd/openapi";

export const oapi = openapi(
  "/api/v1/docs/openapi",
  {
    openapi: "3.0.0",
    info: {
      title: "Express Application",
      description: "Generated docs from an Express api",
      version: "1.0.0"
    },
    paths: {}
  },
  { htmlui: "swagger-ui" }
);

oapi.component("schemas", "User", {
  type: "object",
  description: "User model",
  required: ["name", "email"],
  properties: {
    name: { type: "string" },
    email: { type: "string", uniqueItems: true }
  }
});

oapi.component("schemas", "Greet", {
  type: "object",
  required: ["hello"],
  properties: {
    hello: { type: "string", example: "Hello world" }
  }
});
