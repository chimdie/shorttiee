import { describe, it, beforeAll, expect } from "@jest/globals";
import { app } from "../app";
import { CreateApplicationService } from "../config/services.config";
import { OTP } from "../utils/otp";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import assert from "node:assert";
import { helper } from "./helper";
import { CreateReservationDto, ReservationDto } from "../dto/reservation.dto";

let payload: CreateReservationDto;
let user: { token: string; id: string };
let business: { token: string; id: string };

beforeAll(() => {
  const _user = helper.getUserAuth();
  user = { id: _user.user.id, token: _user.token };

  const _bus = helper.getUserAuthWithBusiness();
  business = { id: _bus.user.id, token: _bus.token };

  payload = {
    listingId: faker.helpers.arrayElement(helper.getListings()).id,
    startDate: new Date().toISOString().split("T")[0],
    endDate: faker.date.future().toISOString().split("T")[0]
  };
});

let createdReservation: ReservationDto;

beforeAll(() => {
  new CreateApplicationService(app).addService("otp", OTP).build();
});

describe("POST /api/v1/users/reservations", () => {
  it("Should throw unauthorized error", async () => {
    const res = await supertest(app)
      .post("/api/v1/users/reservations")
      .set("Accept", "application/json")
      .send(payload)
      .expect(401);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw validation error", async () => {
    const res = await supertest(app)
      .post("/api/v1/users/reservations")
      .auth(user.token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({})
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
  });

  it("Should throw bad request error for wrong reservation", async () => {
    const res = await supertest(app)
      .post("/api/v1/users/reservations")
      .auth(user.token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({ ...payload, listingId: crypto.randomUUID() })
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
    expect(res.body.message).toMatch(/invalid listing/i);
  });

  it("Should not create reservation for past date", async () => {
    const res = await supertest(app)
      .post("/api/v1/users/reservations")
      .auth(user.token, { type: "bearer" })
      .set("Accept", "application/json")
      .send({
        ...payload,
        endDate: faker.date.past().toISOString().split("T")[0],
        startDate: faker.date.past().toISOString().split("T")[0]
      })
      .expect(400);

    assert.equal(res.body.data, undefined);
    assert.equal("error" in res.body, true);
    expect(res.body.message).toMatch(/past/i);
  });

  it("Should not create reservation with business account", async () => {
    const res = await supertest(app)
      .post("/api/v1/users/reservations")
      .auth(business.token, { type: "bearer" })
      .set("Accept", "application/json")
      .send(payload)
      .expect(403);

    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toMatch(/cannot execute/i);
  });

  it("Should create a reservation", async () => {
    const res = await supertest(app)
      .post("/api/v1/users/reservations")
      .set("Accept", "application/json")
      .auth(user.token, { type: "bearer" })
      .send(payload)
      .expect(201);

    expect(typeof res.body.data).toEqual("object");
    expect(typeof res.body.data.code).toEqual("string");
    createdReservation = res.body.data;
  });
});

describe("GET /api/v1/users/reservations", () => {
  it("Should get all reservations for a business user", async () => {
    const res = await supertest(app)
      .get("/api/v1/users/reservations")
      .auth(business.token, { type: "bearer" })
      .expect(200);

    expect(res.body.data).toBeInstanceOf(Array);
    res.body.data.forEach((elt: ReservationDto) => {
      expect(elt).toHaveProperty("code");
      expect(elt).toHaveProperty("amount");
      expect(elt).toHaveProperty("id");
      expect(elt.listingOwnerId).toEqual(business.id);
    });
  });

  it("Should get all reservations for a user", async () => {
    const res = await supertest(app)
      .get("/api/v1/users/reservations")
      .auth(user.token, { type: "bearer" })
      .expect(200);

    expect(res.body.data).toBeInstanceOf(Array);
    res.body.data.forEach((elt: ReservationDto) => {
      expect(elt).toHaveProperty("code");
      expect(elt).toHaveProperty("amount");
      expect(elt).toHaveProperty("id");
      expect(elt.userId).toEqual(user.id);
    });
  });

  it("Should get all reservations for a user", async () => {
    const filter_query = JSON.stringify([["code", "eq", "RES-031"]]);
    const res = await supertest(app)
      .get(
        "/api/v1/users/reservations?filter=" + encodeURIComponent(filter_query)
      )
      .auth(user.token, { type: "bearer" })
      .expect(200);

    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toEqual(1);
    res.body.data.forEach((elt: ReservationDto) => {
      expect(elt).toHaveProperty("code");
      expect(elt).toHaveProperty("amount");
      expect(elt).toHaveProperty("id");
      expect(elt.code).toEqual("RES-031");
    });
  });
});

describe("GET /api/v1/users/reservations/:id", () => {
  it("Should return 400 for invalid param", async () => {
    const res = await supertest(app)
      .get("/api/v1/users/reservations/not-a-uuid")
      .auth(user.token, { type: "bearer" })
      .expect(400);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/validation/i);
  });

  it("Should return 404", async () => {
    const res = await supertest(app)
      .get(`/api/v1/users/reservations/${crypto.randomUUID()}`)
      .auth(user.token, { type: "bearer" })
      .expect(404);

    expect(res.body).toHaveProperty("error");
  });

  it("Should get a listing", async () => {
    if (!createdReservation) {
      throw Error("no created reservation");
    }

    const res = await supertest(app)
      .get(`/api/v1/users/reservations/${createdReservation.id}`)
      .auth(user.token, { type: "bearer" })
      .expect(200);

    expect(res.body.data.id).toEqual(createdReservation.id);
    expect(res.body.data.code).toEqual(createdReservation.code);
  });
});
