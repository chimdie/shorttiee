import { beforeAll, describe, it } from "@jest/globals";
import assert from "node:assert";
import supertest from "supertest";
import { app } from "../app";
import { ChangePasswordDto, LoginDto, RegisterDto } from "../dto/auth.dto";
import { faker } from "@faker-js/faker";
import { CreateApplicationService } from "../config/services.config";
import { OTP } from "../utils/otp";

beforeAll(() => {
  new CreateApplicationService(app).addService("otp", OTP).build();
});

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
let token: string;

describe("POST /api/v1/auth/register", () => {
  it("Should create a user account", async () => {
    const res = await supertest(app)
      .post("/api/v1/auth/register")
      .set("Accept", "application/json")
      .send(userInfo)
      .expect(201);

    assert.ok("data" in res.body);
    assert.notEqual("authId" in res.body.data, true);
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
      .expect(200);

    assert.ok("data" in res.body);
    assert.ok(res.body.data.email === payload.email);
    assert.equal("string", typeof res.body.data.token);

    token = res.body.data.token;
  });
});

// forgot
//
// reset

describe("POST /api/v1/auth/change-password", () => {
  it("Should change user password", async () => {
    const payload: ChangePasswordDto = {
      oldPassword: userInfo.password,
      newPassword: faker.internet.password()
    };

    const res = await supertest(app)
      .post("/api/v1/auth/change-password")
      .set("Accept", "application/json")
      .auth(token, { type: "bearer" })
      .send(payload)
      .expect(200);
    assert.ok("data" in res.body);
    assert.equal(null, res.body.data);

    const wrongLoginPayload: LoginDto = {
      password: userInfo.password,
      email: userInfo.email
    };

    const wrongLoginRes = await supertest(app)
      .post("/api/v1/auth/login")
      .set("Accept", "application/json")
      .send(wrongLoginPayload)
      .expect(400);
    assert.equal(false, "data" in wrongLoginRes.body);

    const loginPayload: LoginDto = {
      password: payload.newPassword,
      email: userInfo.email
    };
    const loginRes = await supertest(app)
      .post("/api/v1/auth/login")
      .set("Accept", "application/json")
      .send(loginPayload)
      .expect(200);

    assert.ok("data" in loginRes.body);
    assert.equal("string", typeof loginRes.body.data.token);
  });
});
