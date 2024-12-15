import multer from "multer";
import { MulterStorageHashing } from "./hash-storage.upload";
import { appEnv } from "../env.config";

export const upload = multer({
  storage: new MulterStorageHashing({
    destination: appEnv.UPLOAD_PATH
  }),
  limits: {
    fileSize: appEnv.FILE_SIZE_LIMIT
  }
});
