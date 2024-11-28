import { Router } from "express";
import { createFileCtl } from "../controllers/file.ctl";
import { upload } from "../config/upload";
import { validator } from "../middlewares/validator.middleware";
import { CreateFileDto } from "../dto/file.dto";

export const filesRouter = Router();

filesRouter.post(
  "/",
  upload.array("files", 6),
  validator({ files: CreateFileDto }),
  createFileCtl
);
