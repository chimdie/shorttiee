import { helper } from "./helper";
import supertest from "supertest";
import { app } from "../app";
import {
  beforeAll,
  afterEach,
  it,
  describe,
  jest,
  expect
} from "@jest/globals";
import path from "path";
import crypto from "node:crypto";
import os from "node:os";
import fs from "node:fs";
import { MulterStorageHashing } from "../config/upload/hash-storage.upload";

// MulterStorageHashing.prototype._handleFile = ;
type MulterFileHander = typeof MulterStorageHashing.prototype._handleFile;
const _mockHandleFile: MulterFileHander = function (_req, file, callback) {
  const filename = file.originalname;
  const destination = os.tmpdir();

  const finalPath = path.join(destination, filename);
  const outStream = fs.createWriteStream(finalPath);

  file.stream.pipe(outStream);
  outStream.on("error", callback);
  const hash = crypto.createHash("sha256");
  file.stream.on("data", function (chunk) {
    hash.update(chunk);
  });

  outStream.on("finish", () => {
    const hashVal = hash.digest("hex");

    callback(null, {
      destination,
      filename,
      path: finalPath,
      size: outStream.bytesWritten,
      hash: hashVal
    });
  });
};

let token = "";

beforeAll(() => {
  token = helper.getUserAuth().token;
});

describe("POST /api/v1/files", () => {
  let mockFileHandler: jest.SpiedFunction<
    typeof MulterStorageHashing.prototype._handleFile
  >;
  beforeAll(() => {
    mockFileHandler = jest.spyOn(MulterStorageHashing.prototype, "_handleFile");
    mockFileHandler.mockImplementation(_mockHandleFile);
  });

  afterEach(() => {
    mockFileHandler.mockClear();
  });

  it("Should throw authentication error", async () => {
    await supertest(app).post("/api/v1/files").send().expect(401);

    expect(mockFileHandler).not.toHaveBeenCalled();
  });

  it("Should throw validation error", async () => {
    await supertest(app)
      .post("/api/v1/files")
      .accept("multipart/form-data")
      .auth(token, { type: "bearer" })
      .expect(400);

    expect(mockFileHandler).not.toHaveBeenCalled();
  });

  // handle duplicate upload
  it("Should not upload duplicate", async () => {
    const res = await supertest(app)
      .post("/api/v1/files")
      .accept("multipart/form-data")
      .attach("files", path.resolve(process.cwd(), "db", "schema.sql"))
      .attach("files", path.resolve(process.cwd(), "db", "schema.sql"))
      .auth(token, { type: "bearer" })
      .expect(201);

    expect(mockFileHandler).toHaveBeenCalledTimes(2);
    expect(res.body.data).toBeTruthy();
    expect(Array.isArray(res.body.data)).toEqual(true);
    expect(res.body.data.length).toEqual(1);
  });

  it("Should upload file", async () => {
    const res = await supertest(app)
      .post("/api/v1/files")
      .accept("multipart/form-data")
      .attach("files", path.resolve(process.cwd(), "README.md"))
      .attach("files", path.resolve(process.cwd(), "db", "schema.sql"))
      .auth(token, { type: "bearer" })
      .expect(201);

    expect(mockFileHandler).toHaveBeenCalledTimes(2);
    expect(res.body.data).toBeTruthy();
    expect(Array.isArray(res.body.data)).toEqual(true);
    expect(res.body.data.length).toEqual(2);
  });

  // handle file link
});

describe("GET /api/v1/files/:name", () => {
  it("Should not find file", async () => {
    const res = await supertest(app)
      .get("/api/v1/files/1234134139.png")
      .expect(404);

    expect(res.body.message).toMatch(/not found/);
  });

  it("Should return file", async () => {
    await supertest(app)
      .get("/api/v1/files/schema.sql")
      .expect(200)
      .expect("Content-Type", /sql/);
  });
});
