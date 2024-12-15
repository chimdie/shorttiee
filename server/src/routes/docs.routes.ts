import { Router } from "express";
import { oapi } from "../config/docs.config";

export const docsRouter = Router();
docsRouter.use(
  oapi.swaggerui({
    deepLinking: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    displayOperationId: true,
    persistAuthorization: true,
    syntaxHighlight: { activate: true, theme: "arta" },
    docExpansion: "none"

    // requestSnippetsEnabled: true,
    // requestSnippets: {
    //   generators: {
    //     node_native: {
    //       title: "NodeJs Native",
    //       syntax: "javascript"
    //     }
    //   }
    // },

    // layout: "StandaloneLayout",
    // presets: [
    //   "SwaggerUIBundle.presets.apis" as any,
    //   "SwaggerUIStandalonePreset" as any
    // ]
    // plugins: ["SwaggerUIBundle.plugins.DownloadUrl" as any]
  })
);
