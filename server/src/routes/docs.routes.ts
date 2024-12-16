import express, { Router } from "express";
import path from "node:path";
import { oapi } from "../config/docs.config";
import { apiReference } from "@scalar/express-api-reference";
import { appEnv } from "../config/env.config";

export const docsRouter = Router();

docsRouter.use("/static", express.static(path.resolve("src/public")));

docsRouter.use("/reference", (req, res) => {
  apiReference({
    theme: "bluePlanet",
    // layout?: 'modern' | 'classic';
    layout: req.query.layout ?? "modern",
    isEditable: true,

    darkMode: true,
    cdn: "/api/v1/docs/static/js/api-reference.js",
    favicon: "favicon-32x32.png",
    spec: {
      url: `http://localhost:${appEnv.PORT}/api/v1/docs/openapi.json`,
      favicon: "/favicon-32x32.png"
    }
  })(req, res);
});

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
