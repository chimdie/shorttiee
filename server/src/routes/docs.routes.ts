import { Router } from "express";
import { oapi } from "../docs";

export const docsRouter = Router();

docsRouter.use(oapi.swaggerui());
