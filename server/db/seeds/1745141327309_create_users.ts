import type { Kysely } from "kysely";
import { Database } from "../../src/db/database.db";
import { faker } from "@faker-js/faker";
import { CreateAuth, CreateUser } from "../../src/dto/types.dto";

export async function seed(db: Kysely<Database>): Promise<void> {
  await db.transaction().execute(async (trx) => {
    for (let i = 0; i < 2; i++) {
      const user = createUser("USER", true);
      const auth = createAuth(user.id);

      await trx.insertInto("tblUsers").values(user).execute();
      await trx.insertInto("tblAuthentications").values(auth).execute();
    }

    for (let i = 0; i <= 10; i++) {
      const user = createUser("USER");
      const auth = createAuth(user.id);

      await trx.insertInto("tblUsers").values(user).execute();
      await trx.insertInto("tblAuthentications").values(auth).execute();
    }

    const admin = createUser("ADMIN");
    const auth = createAuth(admin.id);
    await trx.insertInto("tblUsers").values(admin).execute();
    await trx.insertInto("tblAuthentications").values(auth).execute();
  });
}

function createUser(
  role: CreateUser["role"],
  isBusiness: boolean = false
): CreateUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const businessName = isBusiness ? faker.company.name() : null;

  const user: CreateUser = {
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    gender: faker.helpers.arrayElement(["M", "F"]),
    address: faker.location.streetAddress(),
    mobileNumber: faker.helpers.fromRegExp("+2347[0-9]{9}"),
    businessName: role === "ADMIN" ? null : businessName,
    id: crypto.randomUUID(),
    role,
    referrerCode: null
  };

  return user;
}

function createAuth(userId: string): CreateAuth {
  const auth: CreateAuth = {
    id: crypto.randomUUID(),
    nonce: "nonce",
    userId,
    otpTTL: null,
    otp: null,
    hash: "$2b$10$3dCwdyc7U0BvZKCkPe5JWOgfLzEhhvVUOanVNz/cQXfu9SmvY.C2q" // hash for password
  };

  return auth;
}
