import openapi from "@wesleytodd/openapi";

const description = `
Shorttiee backend documentation <br><br>
Swagger API reference <a href="/api/v1/docs">here</a> <br>
Scalar API reference <a href="/api/v1/docs/reference">here</a> <br>
`;

export const oapi = openapi(
  "/api/v1/docs/openapi",
  {
    openapi: "3.0.3",
    info: {
      title: "Shorttiee backend",
      description,
      version: "1.0.0"
    },
    paths: {}
  },
  { htmlui: "swagger-ui" }
);
