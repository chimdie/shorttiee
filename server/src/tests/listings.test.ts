import { describe, it, before } from "node:test";
import { app } from "../app";
import { db } from "../config/db.config";
import { CreateApplicationService } from "../config/services.config";
import { OTP } from "../utils/otp";
import supertest from "supertest";
import { CreateListingsDto } from "../dto/listings.dto";
import { faker } from "@faker-js/faker";
import assert from "node:assert";
import { helper } from "./helper";

let token = "";
let payload: CreateListingsDto;

before(() => {
  token = helper.getUserAuth().token;
});

const categories: string[] = [];

before(() => {
  const categoryResult = db
    .prepare<[], { id: string }>("SELECT id FROM tblCategories")
    .all();

  if (!categoryResult.length) {
    throw "Categories cannot be empty";
  }

  categoryResult.forEach((e) => categories.push(e.id));
  payload = {
    type: faker.helpers.arrayElement(["SHORTLET", "RENTAL", "SALE"]),
    name: faker.commerce.productName(),
    rate: faker.helpers.arrayElement([100, 300, 5460]),
    price: null,
    images: Array.from<string>({ length: 3 }).fill(faker.image.url()),
    address: faker.location.streetAddress(),
    categoryId: faker.helpers.arrayElement(categories),
    facilities: null,
    description: faker.commerce.productDescription(),
    restrictions: null
  };
});

before(() => {
  new CreateApplicationService(app).addService("otp", OTP).build();
});

describe("POST /api/v1/listings", () => {
  it("Should throw unauthorized error", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .set("Accept", "application/json")
      .send(payload)
      .expect(401);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw validation error", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({})
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw validation error if images array is empty", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({ ...payload, images: [] })
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should create a listing", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .send(payload)
      .expect(201);

    assert.equal(typeof res.body.data, "object");
    assert.notEqual(res.body.data, null);
    assert.notEqual(res.body.data, undefined);
    assert.equal(res.body.data.name, payload.name);
  });
});

describe("GET /api/v1/listings", () => {
  it.todo("Should get all listings", async () => { });
});
