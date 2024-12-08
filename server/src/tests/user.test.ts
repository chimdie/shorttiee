import { beforeAll, describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { app } from "../app";
import { helper } from "./helper";
import { faker } from "@faker-js/faker";

let token = "";
let userId: string;

beforeAll(() => {
  const result = helper.getUserAuth();
  token = result.token;
  userId = result.user.id;
});

describe("GET /api/v1/users/profile", () => {
  it("Should fail due to authentication", async () => {
    const res = await supertest(app)
      .get("/api/v1/users/profile")
      .set("Accept", "application/json")
      .expect(401);

    expect(res.body).toHaveProperty("error");
  });

  it("Should get a user profile", async () => {
    const res = await supertest(app)
      .get("/api/v1/users/profile")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toEqual(userId);
  });
});

describe("PATCH /api/v1/users/profile", () => {
  const photo = faker.image.avatar();

  it("Should fail due to authentication", async () => {
    const res = await supertest(app)
      .patch("/api/v1/users/profile")
      .set("Accept", "application/json")
      .send({ photo })
      .expect(401);

    expect(res.body).toHaveProperty("error");
  });

  it("Should not update user solid data", async () => {
    // WARN:
    // should not update the following
    // - id
    // - email
    // - createdAt
    // - updatedAt
    // - role
    // - referrerCode
    const payload = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: "ADMIN",
      referrerCode: "fake"
    };
    const res = await supertest(app)
      .patch("/api/v1/users/profile")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send(payload)
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).not.toEqual(payload.id);
    expect(res.body.data.email).not.toEqual(payload.email);
    expect(res.body.data.role).not.toEqual(payload.role);
    expect(res.body.data.referrerCode).not.toEqual(payload.referrerCode);
    expect(res.body.data.createdAt).not.toEqual(payload.createdAt);
    expect(res.body.data.updatedAt).not.toEqual(payload.updatedAt);
  });

  it("Should update a user profile", async () => {
    const res = await supertest(app)
      .patch("/api/v1/users/profile")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send({ photo })
      .expect(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data.photo).toEqual(photo);
  });
});
