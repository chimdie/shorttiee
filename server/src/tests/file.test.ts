import { helper } from "./helper";
import supertest from "supertest";
import { app } from "../app";
import { beforeAll, it, describe, jest, expect } from "@jest/globals";
import MulterStorageHashing from "../config/upload/hash-storage.upload";
import path from "path";
import crypto from "node:crypto";
import os from "node:os";
import fs from "node:fs";
import mime from "mime";

let token = "";
let payload: unknown;

beforeAll(() => {
  token = helper.getUserAuth().token;
});

describe("POST /api/v1/files", () => {
  it("Should throw authentication error", async () => {
    const mockFileHandler = jest.spyOn(
      MulterStorageHashing.prototype,
      "_handleFile"
    );
    mockFileHandler.mockImplementation(_mockHandleFile);
    await supertest(app).post("/api/v1/files").send().expect(401);

    expect(mockFileHandler).not.toHaveBeenCalled();
  });

  it("Should throw validation error", async () => {
    const mockFileHandler = jest.spyOn(
      MulterStorageHashing.prototype,
      "_handleFile"
    );
    mockFileHandler.mockImplementation(_mockHandleFile);

    await supertest(app)
      .post("/api/v1/files")
      .accept("multipart/form-data")
      .auth(token, { type: "bearer" })
      .expect(400);

    expect(mockFileHandler).not.toHaveBeenCalled();
  });

  it("Should upload file", async () => {
    const mockFileHandler = jest.spyOn(
      MulterStorageHashing.prototype,
      "_handleFile"
    );
    mockFileHandler.mockImplementation(_mockHandleFile);

    await supertest(app)
      .post("/api/v1/files")
      .accept("multipart/form-data")
      .attach("files", path.resolve(process.cwd(), "README.md"))
      .auth(token, { type: "bearer" })
      .expect(201);

    expect(mockFileHandler).toHaveBeenCalled();
  });
});

// MulterStorageHashing.prototype._handleFile = ;
const _mockHandleFile: typeof MulterStorageHashing.prototype._handleFile =
  function(_req, file, cb) {
    const filename = "image";
    const destination = os.tmpdir();

    const ext = "." + (mime.extension(file.mimetype) || "");
    const finalPath = path.join(destination, filename + ext);
    const outStream = fs.createWriteStream(os.devNull);

    file.stream.pipe(outStream);
    outStream.on("error", cb);
    const hash = crypto.createHash("sha256");
    file.stream.on("data", function(chunk) {
      hash.update(chunk);
    });
    outStream.on("finish", () => {
      const hashVal = hash.digest("hex");

      cb(null, {
        destination,
        filename,
        path: finalPath,
        size: outStream.bytesWritten,
        hash: hashVal
      });
    });
  };
