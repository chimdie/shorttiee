import { db } from "../config/db.config";
import { CategoryDto } from "../dto/category.dto";
import { ListingDto } from "../dto/listings.dto";
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
        businessName: faker.helpers.arrayElement([faker.company.name(), null]),
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

  const users = db.prepare<[], User>("SELECT * FROM tblUsers").all();
  return users;
}

function seedCategories() {
  const vals = ["Beach house", "Villa", "Duplex"];
  const statements = Array.from({ length: vals.length }).map(() => {
    const categoryStatement = db.prepare<CategoryDto[]>(`
      INSERT INTO tblCategories (id, name, comment)
      VALUES(@id, @name, @comment)
    `);

    return categoryStatement;
  });

  const trx = db.transaction(() => {
    // const
    for (const statementIndex in statements) {
      const listings: CategoryDto = {
        id: faker.string.uuid(),
        name: vals[statementIndex],
        comment: null
      };

      statements[statementIndex].run(listings);
    }
  });

  trx();

  const categories = db
    .prepare<[], CategoryDto>("SELECT * FROM tblCategories")
    .all();
  return categories;
}

function seedListings(userIds: string[], categoryIds: string[]) {
  const statements = Array.from({ length: 30 }).map(() => {
    const listingStatement = db.prepare<Omit<ListingDto, "images">[]>(`
      INSERT INTO tblListings (id, name, address, type, status, description, price, rate, restrictions, userId, categoryId)
      VALUES(@id, @name, @address, @type, @status, @description, @price, @rate, @restrictions, @userId, @categoryId)
    `);

    return listingStatement;
  });

  const trx = db.transaction(() => {
    for (const statement of statements) {
      const listings: Omit<ListingDto, "images"> = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        address: faker.location.streetAddress(),
        type: faker.helpers.arrayElement(["RENTAL", "SALE", "SHORTLET"]),
        status: faker.helpers.arrayElement([
          "APPROVED",
          "REJECTED",
          "AWAITING_REVIEW"
        ]),
        description: faker.commerce.productDescription(),
        facilities: null,
        restrictions: null,
        rate: +faker.commerce.price(),
        price: +faker.commerce.price(),

        userId: faker.helpers.arrayElement(userIds),
        categoryId: faker.helpers.arrayElement(categoryIds)
      };

      statement.run(listings);
    }
  });

  trx();

  const listings = db
    .prepare<[], ListingDto>("SELECT * FROM tblListings")
    .all();
  return listings;
}

function skipForeignKeyConstraints<T = void>(fn: (...args: any[]) => T): T {
  db.exec("PRAGMA foreign_keys=OFF;");
  const result = fn();
  db.exec("PRAGMA foreign_keys=ON;");

  return result;
}

async function main() {
  const users = skipForeignKeyConstraints(seedUser);
  const categories = skipForeignKeyConstraints(seedCategories);

  const listings = skipForeignKeyConstraints(() => {
    return seedListings(
      users.map((u) => u.id),
      categories.map((c) => c.id)
    );
  });

  return { users, categories, listings };
}

main();
