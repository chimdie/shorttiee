import { Router } from "express";
import { createFileCtl, getFileCtl } from "../controllers/file.ctl";
import { validator } from "../middlewares/validator.middleware";
import { CreateFileDto } from "../dto/file.dto";
import { authenticate } from "../middlewares/authenticate.middleware";
import { createFileDoc, getFileDoc } from "../docs/file.docs";
import { uploadMiddleware } from "../middlewares/upload.middleware";

export const filesRouter = Router();

filesRouter.post(
  "/",
  createFileDoc,
  authenticate,
  uploadMiddleware,
  validator({ files: CreateFileDto }),
  createFileCtl
);

filesRouter.get(
  "/:name",
  getFileDoc,
  // validator({}),
  getFileCtl
);
