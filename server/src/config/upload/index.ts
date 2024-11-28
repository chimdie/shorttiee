import multer from "multer";
import path from "path";
import { MulterStorageHashing } from "./hash-storage.upload";

export const upload = multer({
  storage: new MulterStorageHashing({
    destination: path.resolve(process.cwd(), "uploads")
  })
});
