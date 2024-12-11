import { DiskStorageOptions, StorageEngine } from "multer";
import type { Request } from "express";
import path from "path";
import crypto from "node:crypto";
import fs from "node:fs";
import fsPromise from "node:fs/promises";
import mime from "mime";
import { appEnv } from "../env.config";

export class MulterStorageHashing implements StorageEngine {
  private getFilename(
    _req: Request,
    _file: Express.Multer.File,
    cb: (err: any, name?: string) => void
  ) {
    crypto.randomBytes(16, function (err, raw) {
      cb(err, err ? undefined : raw.toString("hex"));
    });
  }

  private getDestination(
    _req: Request,
    _file: Express.Multer.File,
    cb: (err: any, dest: string) => void
  ) {
    cb(null, appEnv.UPLOAD_PATH);
  }

  constructor(opts: DiskStorageOptions = {}) {
    this.getFilename = opts.filename || this.getFilename;

    if (typeof opts.destination === "string") {
      const dest = opts.destination;

      fsPromise.mkdir(dest, { recursive: true }).then(() => {
        this.getDestination = (_$0, _$1, cb) => {
          cb(null, dest);
        };
      });
    } else {
      this.getDestination = opts.destination || this.getDestination;
    }
  }

  _handleFile(
    req: Request,
    file: Express.Multer.File,
    cb: (
      error?: any,
      info?: Pick<
        Express.Multer.File,
        "filename" | "size" | "destination" | "path"
      > & { hash: string }
    ) => void
  ) {
    this.getDestination(req, file, (err, destination) => {
      if (err) return cb(err);

      this.getFilename(req, file, (err, filename) => {
        if (err) return cb(err);
        if (!filename) return cb(Error("No filename"));

        const ext = "." + (mime.extension(file.mimetype) ?? "");
        filename += ext;
        const tempPath = path.join(destination, filename);
        const outStream = fs.createWriteStream(tempPath);

        const hash = crypto.createHash("sha256");

        file.stream.pipe(outStream);
        file.stream.pipe(hash);

        outStream.on("error", cb);
        outStream.on("finish", async () => {
          const fileBufferHash = hash.digest("hex");

          const filenameHash = crypto
            .createHash("md5")
            .update(fileBufferHash)
            .digest("hex");

          const newFilename = filenameHash + ext;
          const newPath = path.join(destination, newFilename);
          await fsPromise.rename(tempPath, newPath);

          cb(null, {
            destination,
            filename: newFilename,
            path: newPath,
            size: outStream.bytesWritten,
            hash: fileBufferHash
          });
        });
      });
    });
  }

  _removeFile(
    _req: Request,
    file: Partial<Express.Multer.File>,
    cb: (error: Error | null) => void
  ) {
    const path = file.path;

    delete file.destination;
    delete file.filename;
    delete file.path;

    if (path) {
      fs.unlink(path, cb);
    }
  }
}
