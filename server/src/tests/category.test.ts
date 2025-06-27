import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { app } from "../app";
import { CreateCategoryDto } from "../dto/category.dto";
import assert from "node:assert";
import { faker } from "@faker-js/faker";
import { CreateApplicationService } from "../config/services.config";
import { OTP } from "../utils/otp";
import { helper } from "./helper";

let token = "";
let adminToken = "";

beforeAll(async () => {
  token = (await helper.getUserAuth()).token;
  adminToken = (await helper.getAdminAuth()).token;
});

beforeAll(() => {
  new CreateApplicationService(app).addService("otp", OTP).build();
});

describe("POST /api/v1/categories", () => {
  const payload: CreateCategoryDto = {
    comment: faker.commerce.productDescription(),
    name: "Beach Mansion"
  };

  it("Should not create category for non-admin", async () => {
    const res = await supertest(app)
      .post("/api/v1/categories")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send(payload)
      .expect(403);

    expect(typeof res.body.error).toEqual("string");
    expect(res.body.message).toMatch(/cannot execute/i);
  });

  it("Should create a category", async () => {
    const res = await supertest(app)
      .post("/api/v1/categories")
      .set("Accept", "application/json")
      .auth(adminToken, { type: "bearer" })
      .send(payload)
      .expect(201);

    assert.equal(typeof res.body.data, "object");
    assert.ok("id" in res.body.data);
    assert.equal(payload.name, res.body.data.name);
  });

  it("Should throw duplicate error", async () => {
    const res = await supertest(app)
      .post("/api/v1/categories")
      .set("Accept", "application/json")
      .auth(adminToken, { type: "bearer" })
      .send(payload)
      .expect(400);

    assert.ok("error" in res.body);
    assert.equal(typeof res.body.error, "string");
  });

  it("Should throw validation error", async () => {
    const res = await supertest(app)
      .post("/api/v1/categories")
      .set("Accept", "application/json")
      .auth(adminToken, { type: "bearer" })
      .send({})
      .expect(400);

    assert.ok("error" in res.body);
    assert.equal(res.body.error, "ValidationError");
  });

  it("Should throw Unauthorized error", async () => {
    const res = await supertest(app)
      .post("/api/v1/categories")
      .set("Accept", "application/json")
      .send(payload)
      .expect(401);

    assert.ok("error" in res.body);
    assert.equal(res.body.error, "Unauthorized");
  });
});

describe("GET /api/v1/categories", () => {
  it("Should get all categories", async () => {
    const res = await supertest(app)
      .get("/api/v1/categories")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .expect(200);

    assert.ok("data" in res.body);
    assert.ok(Array.isArray(res.body.data));
  });
});
