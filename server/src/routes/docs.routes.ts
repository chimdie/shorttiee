import { Router } from "express";
import { oapi } from "../config/docs.config";

export const docsRouter = Router();
docsRouter.use(
  oapi.swaggerui({
    validatorUrl: "http://localhost:3000/api/v1/openapi/validate",
    deepLinking: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    displayOperationId: true,
    persistAuthorization: true,
    syntaxHighlight: { activate: true, theme: "arta" }
    // layout: "StandaloneLayout",
    // presets: [
    //   "SwaggerUIBundle.presets.apis" as any,
    //   "SwaggerUIStandalonePreset" as any
    // ],
    // plugins: [
    //   "SwaggerUIBundle.plugins.DownloadUrl" as any,
    // ]
  })
);
