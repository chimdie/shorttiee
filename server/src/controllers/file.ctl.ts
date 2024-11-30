import assert from "assert";
import { Request } from "express";
import { db } from "../config/db.config";
import {
  createFileQuery,
  findFileByChecksumQuery,
  findFileByPathQuery
} from "../db/file.db";
import { ctlWrapper } from "../utils/ctl-wrapper";
import { NotFoundResponse, SuccessResponse } from "../utils/response";
import fs from "fs";
import path from "path";
import mime from "mime";
import { FindFileDto } from "../dto/file.dto";
import { appEnv } from "../config/env.config";

const UPLOAD_FILE_PATH = "/api/v1/files/";
// TODO: docs
export const createFileCtl = ctlWrapper(async (req, res) => {
  const userId = req.user?.id;
  assert(userId);
  assert(Array.isArray(req.files));

  // deduplicate
  const filesMap = new Map<string, Express.Multer.File>();
  for (const file of req.files) {
    filesMap.set(file.hash, file);
  }
  const dedupedFiles = Array.from(filesMap.values());

  const checksums = dedupedFiles.map((e) => e.hash);

  const oldFiles = new Set(
    findFileByChecksumQuery(checksums).map((e) => e.checksum)
  );

  const uploadfiles = dedupedFiles.filter((e) => !oldFiles.has(e.hash));

  const trx = db.transaction(() => {
    for (const file of uploadfiles as Express.Multer.File[]) {
      createFileQuery().run({
        filename: file.filename,
        size: file.size,
        type: "FILE",
        contentType: file.mimetype,
        ownerId: userId,
        checksum: file.hash,
        path: UPLOAD_FILE_PATH + file.filename
      });
    }
  });
  trx();

  const files = findFileByChecksumQuery(checksums);
  // console.log("files", req.baseUrl, files);

  return SuccessResponse(res, files, 201);
});

// TODO: docs
export const getFileCtl = ctlWrapper(async (req: Request<FindFileDto>, res) => {
  const file = findFileByPathQuery(UPLOAD_FILE_PATH + req.params.name);
  if (!file) {
    return NotFoundResponse(res);
  }

  const filePath = path.resolve(appEnv.UPLOAD_PATH, file.filename);
  const reader = fs.createReadStream(filePath);

  res.type(mime.lookup(req.params.name));
  reader.pipe(res);
});
