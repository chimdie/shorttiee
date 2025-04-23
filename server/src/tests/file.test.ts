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
import { MulterStorageHashing } from "../config/upload/hash-storage.upload";
import { appEnv } from "../config/env.config";
import fs from "fs";

let token = "";
let fileUrl = "";
const fileSize = appEnv.FILE_SIZE_LIMIT;

const schemaFile = path.resolve(process.cwd(), "db", "schema.sql");
const readmeFile = path.resolve(process.cwd(), "README.md");
console.log(">>>", process.cwd());
console.log(">>>", schemaFile);
console.log(">>>", readmeFile);
console.log(">>>", fs.existsSync(schemaFile), fs.existsSync(readmeFile));

beforeAll(async () => {
  token = (await helper.getUserAuth()).token;
});

describe("POST /api/v1/files", () => {
  let mockFileHandler: jest.SpiedFunction<
    typeof MulterStorageHashing.prototype._handleFile
  >;
  beforeAll(() => {
    mockFileHandler = jest.spyOn(MulterStorageHashing.prototype, "_handleFile");
  });

  afterEach(() => {
    mockFileHandler.mockClear();
    appEnv.FILE_SIZE_LIMIT = fileSize;
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

  it("Should not upload over file limit", async () => {
    appEnv.FILE_SIZE_LIMIT = 1;

    const res = await supertest(app)
      .post("/api/v1/files")
      .accept("multipart/form-data")
      .attach("files", schemaFile)
      .auth(token, { type: "bearer" })
      .expect(413);

    expect(res.body).toHaveProperty("error");
  });

  // handle duplicate upload
  it("Should not upload duplicate", async () => {
    const res = await supertest(app)
      .post("/api/v1/files")
      .accept("multipart/form-data")
      .attach("files", schemaFile)
      .attach("files", schemaFile)
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
      .attach("files", readmeFile)
      .attach("files", schemaFile)
      .auth(token, { type: "bearer" })
      .expect(201);

    expect(mockFileHandler).toHaveBeenCalledTimes(2);
    expect(res.body.data).toBeTruthy();
    expect(Array.isArray(res.body.data)).toEqual(true);
    expect(res.body.data.length).toEqual(2);

    fileUrl = path.basename(
      res.body.data.find((e: { path: string; checksum: string }) =>
        e.path.includes("sql")
      )?.path
    );
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
      .get("/api/v1/files/" + fileUrl)
      .expect(200)
      .expect("Content-Type", /sql/);
  });
});
