import { Router } from "express";
import { oapi } from "../config/docs.config";

export const docsRouter = Router();

docsRouter.use(oapi.swaggerui());
