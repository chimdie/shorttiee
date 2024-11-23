import { before, describe, it } from "node:test";
import supertest from "supertest";
import { app } from "../app";
import { CreateCategoryDto } from "../dto/category.dto";
import { db } from "../config/db.config";
import { signAuthToken } from "../utils/auth-token";
import assert from "node:assert";
import { faker } from "@faker-js/faker";

let token = "";

before(() => {
  // get auth token
  const user = db
    .prepare<[], { id: string; nonce: string }>(
      `SELECT u.id, a.nonce 
        FROM tblUsers AS u
        JOIN  tblAuthentications AS a ON a.userId = u.id LIMIT 1`
    )
    .get();

  if (!user) {
    throw "Can't setup user";
  }

  const [err, payload] = signAuthToken(user);

  if (err) {
    throw "Can't setup token";
  }

  token = payload;
});

describe("POST /api/v1/categories", async () => {
  const payload: CreateCategoryDto = {
    comment: faker.commerce.productDescription(),
    name: "Beach Mansion"
  };

  await it("Should create a category", async () => {
    const res = await supertest(app)
      .post("/api/v1/categories")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
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
      .auth(token, { type: "bearer" })
      .send(payload)
      .expect(400);

    assert.ok("error" in res.body);
    assert.equal(typeof res.body.error, "string");
  });

  it("Should throw validation error", async () => {
    const res = await supertest(app)
      .post("/api/v1/categories")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
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
