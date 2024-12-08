import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { app } from "../app";
import { CreateFacilityDto } from "../dto/facility.dto";
import { faker } from "@faker-js/faker";
import { helper } from "./helper";

let token = "";

beforeAll(() => {
  token = helper.getUserAuth().token;
});

describe("POST /api/v1/facilities", () => {
  const payload: CreateFacilityDto = {
    name: "Bathroom",
    icon: faker.word.verb(),
    color: faker.color.human(),
    comment: faker.commerce.productDescription()
  };

  it("Should create a facility", async () => {
    const res = await supertest(app)
      .post("/api/v1/facilities")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send(payload)
      .expect(201);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("name", payload.name);
  });

  it("Should throw duplicate error", async () => {
    const res = await supertest(app)
      .post("/api/v1/facilities")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send(payload)
      .expect(400);

    expect(res.body).toHaveProperty("error");
    expect(typeof res.body.error).toBe("string");
  });

  it("Should throw validation error", async () => {
    const res = await supertest(app)
      .post("/api/v1/facilities")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send({})
      .expect(400);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("ValidationError");
  });

  it("Should throw Unauthorized error", async () => {
    const res = await supertest(app)
      .post("/api/v1/facilities")
      .set("Accept", "application/json")
      .send(payload)
      .expect(401);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Unauthorized");
  });
});

describe("GET /api/v1/facilities", () => {
  it("Should get all facilities", async () => {
    const res = await supertest(app)
      .get("/api/v1/facilities")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBeInstanceOf(Array);
  });
});
