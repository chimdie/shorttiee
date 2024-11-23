import { describe, it } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import { app } from "../app";
import { ChangePasswordDto, LoginDto, RegisterDto } from "../dto/auth.dto";
import { faker } from "@faker-js/faker";

describe("POST /api/v1/listings", () => {
  it("Should create a listing", async () => { });
});

describe("GET /api/v1/listings", () => {
  it("Should get all listings", async () => { });
});