import assert from "assert";
import { db } from "../config/db.config";
import { createFileQuery, findFileByChecksumQuery } from "../db/file.db";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { SuccessResponse } from "../utils/response";
import fs from "fs";
import path from "path";
import mime from "mime";

export const createFileCtl = ctlWrapper(async (req, res) => {
  const userId = req.user?.id;
  assert(userId);
  assert(Array.isArray(req.files));

  const checksums = req.files.map((e) => e.hash);

  const trx = db.transaction(() => {
    for (const file of req.files as Express.Multer.File[]) {
      createFileQuery().run({
        filename: file.filename,
        size: file.size,
        type: "FILE",
        contentType: file.mimetype,
        ownerId: userId,
        checksum: file.hash,
        path: "/api/v1/files/" + file.filename
      });
    }
  });
  trx();

  const files = findFileByChecksumQuery(checksums);
  // console.log("files", req.baseUrl, files);

  return SuccessResponse(res, files, 201);
});

export const getFileCtl = ctlWrapper(async (req, res) => {
  console.log("HERE");
  const reader = fs.createReadStream(
    path.resolve(process.cwd(), req.params.name)
  );

  res.type(mime.lookup(req.params.name));

  reader.pipe(res);
});
