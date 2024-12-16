import { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";
import { appEnv } from "../config/env.config";
import { MulterStorageHashing } from "../config/upload/hash-storage.upload";
import { ErrorResponse } from "../utils/response";

export const uploadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const upload = multer({
    storage: new MulterStorageHashing({
      destination: appEnv.UPLOAD_PATH
    }),
    limits: {
      fileSize: appEnv.FILE_SIZE_LIMIT
    }
  });

  const mid = upload.array("files", 6);
  mid(req, res, _next);

  function _next(err?: any) {
    if (!err) {
      return next();
    }

    if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
      return ErrorResponse(res, err.message, "Content Too Large", 413);
    }

    return next(err);
  }
};
