import assert from "assert";
import { db } from "../config/db.config";
import { createFileQuery } from "../db/file.db";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { SuccessResponse } from "../utils/response";
import mime from "mime";

export const createFileCtl = ctlWrapper(async (req, res) => {
  console.log("files", req.files, req.body);

  const userId = req.user?.id;
  assert(userId);

  const trx = db.transaction(() => {
    for (const file of req.files as Express.Multer.File[]) {
      const filename = file.filename + (mime.extension(file.mimetype) ?? "");
      createFileQuery().run({
        filename,
        size: file.size,
        type: "FILE",
        contentType: file.mimetype,
        ownerId: userId,
        checksum: file.hash,
        path: "/api/v1/files/" + filename
      });
    }
  });
  trx();

  return SuccessResponse(res, null, 201);
});
