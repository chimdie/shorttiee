import { oapi } from "../config/docs.config";

oapi.component("securitySchemes", "BearerAuth", {
  description: "JWT authentication",
  type: "http",
  scheme: "bearer"
});
