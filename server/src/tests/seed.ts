import { db } from "../config/db.config";
import { Auth, User } from "../dto/types.dto";
import { faker } from "@faker-js/faker";

function seedUser() {
  const statements = Array.from({ length: 10 }).map(() => {
    const userStatement = db.prepare<User[]>(`
      INSERT INTO tblUsers (email, gender, address, firstName, lastName, mobileNumber, businessName, id, referrerCode)
      VALUES(@email, @gender, @address, @firstName, @lastName, @mobileNumber, @businessName, @id, @referrerCode)
    `);

    const authStatement = db.prepare<Auth[]>(`
      INSERT INTO tblAuthentications (id, hash, userId, nonce, otp, otpTTL)
      VALUES(@id, @hash, @userId, @nonce, @otp, @otpTTL)
    `);

    return [userStatement, authStatement] as const;
  });

  const trx = db.transaction(() => {
    for (const [userStatement, authStatement] of statements) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const user: User = {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }),
        gender: faker.helpers.arrayElement(["M", "F"]),
        address: faker.location.streetAddress(),
        mobileNumber: faker.helpers.fromRegExp("+2347[0-9]{9}"), //.phone.number({ style: "international" })
        businessName: faker.company.name(),
        id: crypto.randomUUID(),
        referrerCode: null
      };

      const auth: Auth = {
        id: crypto.randomUUID(),
        nonce: "nonce",
        userId: user.id,
        otpTTL: null,
        otp: null,
        hash: "$2b$10$3dCwdyc7U0BvZKCkPe5JWOgfLzEhhvVUOanVNz/cQXfu9SmvY.C2q" // hash for password
      };

      // console.log([user, auth]);
      authStatement.run(auth);
      userStatement.run(user);
    }
  });

  trx();
}

function skipForeignKeyConstraints(fn: (...args: any[]) => void) {
  db.exec("PRAGMA foreign_keys=OFF;");
  fn();
  db.exec("PRAGMA foreign_keys=ON;");
}

async function main() {
  skipForeignKeyConstraints(seedUser);
}

main();
