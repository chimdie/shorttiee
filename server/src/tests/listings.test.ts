import { describe, it, beforeAll, expect } from "@jest/globals";
import { app } from "../app";
import { db } from "../config/db.config";
import { CreateApplicationService } from "../config/services.config";
import { OTP } from "../utils/otp";
import supertest from "supertest";
import { CreateListingsDto, ListingDto } from "../dto/listings.dto";
import { faker } from "@faker-js/faker";
import assert from "node:assert";
import { helper } from "./helper";

let token = "";
let businessToken = "";
let payload: CreateListingsDto;

beforeAll(() => {
  token = helper.getUserAuth().token;
  businessToken = helper.getUserAuthWithBusiness().token;
});

const categories: string[] = [];
const facilities: string[] = [];
let createdListing: ListingDto;

beforeAll(() => {
  const categoryResult = db
    .prepare<[], { id: string }>("SELECT id FROM tblCategories")
    .all();
  const facilityResult = db
    .prepare<[], { id: string }>("SELECT id FROM tblFacilities LIMIT 3")
    .all();

  if (!categoryResult.length || !facilityResult.length) {
    throw "Categories cannot be empty";
  }

  categoryResult.forEach((e) => categories.push(e.id));

  facilities.push(
    ...faker.helpers.arrayElements(facilityResult.map((e) => e.id))
  );

  payload = {
    type: faker.helpers.arrayElement(["SHORTLET", "RENTAL", "SALE"]),
    name: faker.commerce.productName(),
    rate: faker.helpers.arrayElement([100, 300, 5460]),
    price: null,
    images: Array.from<string>({ length: 3 }).fill(faker.image.url()),
    address: faker.location.streetAddress(),
    categoryId: faker.helpers.arrayElement(categories),
    facilities,
    description: faker.commerce.productDescription(),
    restrictions: null
  };
});

beforeAll(() => {
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
      .auth(businessToken, { type: "bearer" })
      .set("Accept", "application/json")
      .send({})
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw validation error if images array is empty", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(businessToken, { type: "bearer" })
      .set("Accept", "application/json")
      .send({ ...payload, images: [] })
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw bad request error for wrong facilities", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(businessToken, { type: "bearer" })
      .set("Accept", "application/json")
      .send({ ...payload, facilities: [crypto.randomUUID()] })
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
    expect(res.body.message).toMatch(/invalid facilities/i);
  });

  it("Should throw bad request error for wrong category", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(businessToken, { type: "bearer" })
      .set("Accept", "application/json")
      .send({ ...payload, categoryId: crypto.randomUUID() })
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
    expect(res.body.message).toMatch(/not exist/);
  });

  it("Should not create a listing for non-business account", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .send(payload)
      .expect(403);

    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toMatch(/cannot execute/i);
  });

  it("Should create a listing", async () => {
    const res = await supertest(app)
      .post("/api/v1/listings")
      .auth(businessToken, { type: "bearer" })
      .set("Accept", "application/json")
      .send(payload)
      .expect(201);

    assert.equal(typeof res.body.data, "object");
    assert.notEqual(res.body.data, null);
    assert.notEqual(res.body.data, undefined);
    assert.equal(res.body.data.name, payload.name);
    expect(res.body.data.images).toBeInstanceOf(Array);
    // expect(res.body.data.facilities).toBeInstanceOf(Array);
    // expect(expect.arrayContaining(facilities)).toEqual(
    //   res.body.data.facilities.map((e: FacilityDto) => e.id)
    // );
    createdListing = res.body.data;
  });
});

describe("GET /api/v1/listings", () => {
  it("Should get all listings", async () => {
    const res = await supertest(app)
      .get("/api/v1/listings")
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data[0].images).toBeInstanceOf(Array);
  });

  it("Should get filtered query", async () => {
    const res = await supertest(app)
      .get(
        "/api/v1/listings?filter=%5B%5B%22status%22%2C%22eq%22%2C%22APPROVED%22%5D%5D"
      )
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body.data).toBeInstanceOf(Array);
    res.body.data.forEach((element: ListingDto) => {
      expect(element).toHaveProperty("status");
      expect(element.status).toEqual("APPROVED");
    });
  });
});

describe("GET /api/v1/listings/:id", () => {
  it("Should return 400 for invalid param", async () => {
    const res = await supertest(app)
      .get("/api/v1/listings/not-a-uuid")
      .auth(token, { type: "bearer" })
      .expect(400);

    expect(res.body.error).toMatch(/validation/i);
  });

  it("Should return 404 for getting a listing", async () => {
    const res = await supertest(app)
      .get(`/api/v1/listings/${crypto.randomUUID()}`)
      .auth(token, { type: "bearer" })
      .expect(404);

    expect(res.body.error).toBeTruthy();
  });

  it("Should get a listing", async () => {
    if (!createdListing) {
      throw Error("no created Listing");
    }

    const res = await supertest(app)
      .get(`/api/v1/listings/${createdListing.id}`)
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body.data.id).toEqual(createdListing.id);
    expect(res.body.data.images).toBeInstanceOf(Array);
    // expect(res.body.data.facilities).toBeInstanceOf(Array);
    // expect(expect.arrayContaining(facilities)).toEqual(
    //   res.body.data.facilities.map((e: FacilityDto) => e.id)
    // );
  });
});
