import openapi from "@wesleytodd/openapi";

export const oapi = openapi(
  "/api/v1/docs/openapi",
  {
    openapi: "3.0.3",
    info: {
      title: "Shorttiee backend",
      description: "Shorttiee backend documentation",
      version: "1.0.0"
    },
    paths: {}
  },
  { htmlui: "swagger-ui" }
);
