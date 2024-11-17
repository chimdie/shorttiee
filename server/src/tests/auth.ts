import { describe, it } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import { app } from "../app";
import { LoginDto, RegisterDto } from "../dto/auth.dto";
import { faker } from "@faker-js/faker";

const userInfo: RegisterDto = {
  email: faker.internet.email(),
  gender: faker.helpers.arrayElement(["M", "F"]),
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  mobileNumber: faker.helpers.fromRegExp("+2347[0-9]{9}"), //.phone.number({ style: "international" })
  businessName: faker.company.name(),
  password: faker.internet.password()
};

describe("POST /api/v1/auth/register", () => {
  it("Should create a user account", async () => {
    const res = await supertest(app)
      .post("/api/v1/auth/register")
      .set("Accept", "application/json")
      .send(userInfo)
      .expect(201);

    assert.ok("data" in res.body);
    assert.equal("string", typeof res.body.data.token);
  });
});

describe("POST /api/v1/auth/login", () => {
  it("Should login and authenticate user", async () => {
    const payload: LoginDto = {
      password: userInfo.password,
      email: userInfo.email
    };

    const res = await supertest(app)
      .post("/api/v1/auth/login")
      .set("Accept", "application/json")
      .send(payload)
      .expect(201);

    assert.ok("data" in res.body);
    assert.ok(res.body.data.email === payload.email);
    assert.equal("string", typeof res.body.data.token);
  });
});
