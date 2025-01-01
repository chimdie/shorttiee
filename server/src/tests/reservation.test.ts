import { describe, it, beforeAll, expect } from "@jest/globals";
import { app } from "../app";
import { CreateApplicationService } from "../config/services.config";
import { OTP } from "../utils/otp";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import assert from "node:assert";
import { helper } from "./helper";
import { CreateReservationDto, ReservationDto } from "../dto/reservation.dto";

let token = "";
let businessToken = "";
let payload: CreateReservationDto;

beforeAll(() => {
  token = helper.getUserAuth().token;
  businessToken = helper.getUserAuthWithBusiness().token;

  payload = {
    listingId: faker.helpers.arrayElement(helper.getListings()).id,
    startDate: faker.date.anytime().toISOString().split("T")[0],
    endDate: faker.date.anytime().toISOString().split("T")[0]
  };
});

let createdReservation: ReservationDto;

beforeAll(() => {
  new CreateApplicationService(app).addService("otp", OTP).build();
});

describe("POST /api/v1/reservations", () => {
  it("Should throw unauthorized error", async () => {
    const res = await supertest(app)
      .post("/api/v1/reservations")
      .set("Accept", "application/json")
      .send(payload)
      .expect(401);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw validation error", async () => {
    const res = await supertest(app)
      .post("/api/v1/reservations")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({})
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw bad request error for wrong listing", async () => {
    const res = await supertest(app)
      .post("/api/v1/reservations")
      .auth(token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({ ...payload, listingId: crypto.randomUUID() })
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
    expect(res.body.message).toMatch(/invalid listing/i);
  });

  it("Should not create reservation with business account", async () => {
    const res = await supertest(app)
      .post("/api/v1/reservations")
      .auth(businessToken, { type: "bearer" })
      .set("Accept", "application/json")
      .send(payload)
      .expect(403);

    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toMatch(/cannot execute/i);
  });

  it("Should create a listing", async () => {
    const res = await supertest(app)
      .post("/api/v1/reservations")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send(payload)
      .expect(201);

    expect(typeof res.body.data).toEqual("object");
    expect(typeof res.body.data.code).toEqual("string");
    createdReservation = res.body.data;
  });
});

// describe("GET /api/v1/listings", () => {
//   it("Should get all listings", async () => {
//     const res = await supertest(app)
//       .get("/api/v1/listings")
//       .auth(token, { type: "bearer" })
//       .expect(200);
//
//     expect(res.body.data).toBeInstanceOf(Array);
//     expect(res.body.data[0].images).toBeInstanceOf(Array);
//   });
//
//   it("Should get filtered query", async () => {
//     const res = await supertest(app)
//       .get(
//         "/api/v1/listings?filter=%5B%5B%22status%22%2C%22eq%22%2C%22APPROVED%22%5D%5D"
//       )
//       .auth(token, { type: "bearer" })
//       .expect(200);
//
//     expect(res.body.data).toBeInstanceOf(Array);
//     res.body.data.forEach((element: ListingDto) => {
//       expect(element).toHaveProperty("status");
//       expect(element.status).toEqual("APPROVED");
//     });
//   });
// });
//
// describe("GET /api/v1/listings/:id", () => {
//   it("Should return 400 for invalid param", async () => {
//     const res = await supertest(app)
//       .get("/api/v1/listings/not-a-uuid")
//       .auth(token, { type: "bearer" })
//       .expect(400);
//
//     expect(res.body.error).toMatch(/validation/i);
//   });
//
//   it("Should return 404 for getting a listing", async () => {
//     const res = await supertest(app)
//       .get(`/api/v1/listings/${crypto.randomUUID()}`)
//       .auth(token, { type: "bearer" })
//       .expect(404);
//
//     expect(res.body.error).toBeTruthy();
//   });
//
//   it("Should get a listing", async () => {
//     if (!createdListing) {
//       throw Error("no created Listing");
//     }
//
//     const res = await supertest(app)
//       .get(`/api/v1/listings/${createdListing.id}`)
//       .auth(token, { type: "bearer" })
//       .expect(200);
//
//     expect(res.body.data.id).toEqual(createdListing.id);
//     expect(res.body.data.images).toBeInstanceOf(Array);
//     // expect(res.body.data.facilities).toBeInstanceOf(Array);
//     // expect(expect.arrayContaining(facilities)).toEqual(
//     //   res.body.data.facilities.map((e: FacilityDto) => e.id)
//     // );
//   });
// });
//
// describe("GET /api/v1/listings/:id/facilities", () => {
//   it("Should not get any facilities for listing", async () => {
//     const res = await supertest(app)
//       .get(`/api/v1/listings/${crypto.randomUUID()}/facilities`)
//       .set("Accept", "application/json")
//       .expect(200);
//
//     expect(res.body).toHaveProperty("data");
//     expect(res.body.data).toBeInstanceOf(Array);
//     expect(res.body.data.length).toEqual(0);
//   });
//
//   it("Should get all facilities for a listing", async () => {
//     if (!createdListing) {
//       throw Error("no created Listing");
//     }
//
//     const totalListingFacitities = db
//       .prepare<
//         string[],
//         { total: number }
//       >("SELECT count(*) as  total FROM tblListingsFacilities where listingId = ?")
//       .get(createdListing.id);
//
//     if (totalListingFacitities === undefined) {
//       throw Error("Error getting listings facilities");
//     }
//
//     const res = await supertest(app)
//       .get(`/api/v1/listings/${createdListing.id}/facilities`)
//       .set("Accept", "application/json")
//       .expect(200);
//
//     expect(res.body).toHaveProperty("data");
//     expect(res.body.data).toBeInstanceOf(Array);
//     expect(res.body.data.length).toEqual(totalListingFacitities.total);
//     expect(expect.arrayContaining(facilities)).toEqual(
//       res.body.data.map((e: FacilityDto) => e.id)
//     );
//   });
// });
