import { describe, it, beforeAll, expect } from "@jest/globals";
import { app } from "../app";
import { CreateApplicationService } from "../config/services.config";
import { OTP } from "../utils/otp";
import supertest from "supertest";
import {
  CreateListingsDto,
  ListingDto,
  ReviewListingDto
} from "../dto/listings.dto";
import { faker } from "@faker-js/faker";
import assert from "node:assert";
import { helper } from "./helper";
import { FacilityDto } from "../dto/facility.dto";
import { findListingByIdQuery } from "../db/listing.db";
import { DB } from "../config/db.config";

let token = "";
let businessToken = "";
let adminToken = "";
let payload: CreateListingsDto;

beforeAll(async () => {
  token = (await helper.getUserAuth()).token;
  businessToken = (await helper.getUserAuthWithBusiness()).token;
  adminToken = (await helper.getAdminAuth()).token;
});

const categories: string[] = [];
const facilities: string[] = [];
let createdListing: ListingDto;

beforeAll(async () => {
  const categoryResult = await DB.selectFrom("tblCategories")
    .select("id")
    .execute();
  const facilityResult = await DB.selectFrom("tblFacilities")
    .select("id")
    .limit(3)
    .execute();

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
        "/api/v1/listings?filter=%5B%5B%22status%22%2C%22%3D%22%2C%22APPROVED%22%5D%5D"
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
    expect(res.body.data.user).toBeTruthy();
    expect(res.body.data.user).toMatchObject(
      expect.objectContaining({
        firstName: expect.any(String),
        lastName: expect.any(String),
        email: expect.any(String),
        // photo: expect.any(String), // could be null
        mobileNumber: expect.any(String),
        businessName: expect.any(String)
      })
    );
    expect(res.body.data.user).not.toMatchObject(
      expect.objectContaining({
        referrerCode: expect.any(String),
        address: expect.any(String),
        gender: expect.any(String),
        role: expect.any(String),
        id: expect.any(String)
      })
    );

    // expect(res.body.data.facilities).toBeInstanceOf(Array);
    // expect(expect.arrayContaining(facilities)).toEqual(
    //   res.body.data.facilities.map((e: FacilityDto) => e.id)
    // );
  });
});

describe("GET /api/v1/listings/:id/facilities", () => {
  it("Should not get any facilities for listing", async () => {
    const res = await supertest(app)
      .get(`/api/v1/listings/${crypto.randomUUID()}/facilities`)
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toEqual(0);
  });

  it("Should get all facilities for a listing", async () => {
    if (!createdListing) {
      throw Error("no created Listing");
    }

    const totalListingFacitities = await DB.selectFrom("tblListingsFacilities")
      .select((eb) => eb.fn.countAll().as("total"))
      .where("listingId", "=", createdListing.id)
      .executeTakeFirst();

    if (totalListingFacitities === undefined) {
      throw Error("Error getting listings facilities");
    }

    const res = await supertest(app)
      .get(`/api/v1/listings/${createdListing.id}/facilities`)
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toEqual(totalListingFacitities.total);
    expect(expect.arrayContaining(facilities)).toEqual(
      res.body.data.map((e: FacilityDto) => e.id)
    );
  });
});

describe("PATCH /api/v1/listings/:id", () => {
  it("Should return 400 for invalid param", async () => {
    const res = await supertest(app)
      .patch("/api/v1/listings/not-a-uuid")
      .auth(adminToken, { type: "bearer" })
      .expect(400);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/validation/i);
  });

  it("Should return 400 for bad request", async () => {
    await supertest(app)
      .patch("/api/v1/listings/" + createdListing.id)
      .auth(adminToken, { type: "bearer" })
      .send({ status: "DONE" })
      .expect(400);
  });

  it("Should return 403 for restricted to admin", async () => {
    const res = await supertest(app)
      .patch("/api/v1/listings/" + createdListing.id)
      .auth(businessToken, { type: "bearer" })
      .send(payload)
      .expect(403);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/Forbidden/i);
  });

  it("Should review the listing", async () => {
    const payload: ReviewListingDto = { status: "ACCEPT" };
    const res = await supertest(app)
      .patch("/api/v1/listings/" + createdListing.id)
      .auth(adminToken, { type: "bearer" })
      .send(payload)
      .expect(200);

    const [error, listing] = await findListingByIdQuery(createdListing.id);
    assert(error === null);
    assert(!!listing);

    expect(listing.status).toEqual("APPROVED");
    expect(res.body.data.status).toEqual(listing.status);
  });
});
