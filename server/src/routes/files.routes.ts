import { Router } from "express";
import { createFileCtl, getFileCtl } from "../controllers/file.ctl";
import { upload } from "../config/upload";
import { validator } from "../middlewares/validator.middleware";
import { CreateFileDto } from "../dto/file.dto";
import { authenticate } from "../middlewares/auth.middleware";

export const filesRouter = Router();

filesRouter.post(
  "/",
  authenticate,
  upload.array("files", 6),
  validator({ files: CreateFileDto }),
  createFileCtl
);

filesRouter.get(
  "/:name",
  // validator({}),
  getFileCtl
);
