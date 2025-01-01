import { db } from "../config/db.config";
import { CategoryDto } from "../dto/category.dto";
import { ListingDto } from "../dto/listings.dto";
import { Auth } from "../dto/types.dto";
import { faker } from "@faker-js/faker";
import { Merge } from "../types/utils";
import { FacilityDto } from "../dto/facility.dto";
import { FacilityListing } from "../db/facility-and-listing.db";
import { UserDto } from "../dto/user.dto";
import { ReservationDto } from "../dto/reservation.dto";

function seedUser() {
  const statements = Array.from({ length: 10 }).map(() => {
    const userStatement = db.prepare<UserDto[]>(`
      INSERT INTO tblUsers (email, gender, address, firstName, lastName, mobileNumber, businessName, id, referrerCode, role)
      VALUES(@email, @gender, @address, @firstName, @lastName, @mobileNumber, @businessName, @id, @referrerCode, @role)
    `);

    const authStatement = db.prepare<Auth[]>(`
      INSERT INTO tblAuthentications (id, hash, userId, nonce, otp, otpTTL)
      VALUES(@id, @hash, @userId, @nonce, @otp, @otpTTL)
    `);

    return [userStatement, authStatement] as const;
  });

  const adminStatement = statements.pop() as (typeof statements)[0];

  const trx = db.transaction(() => {
    for (const [userStatement, authStatement] of statements) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const user: UserDto = {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }),
        gender: faker.helpers.arrayElement(["M", "F"]),
        address: faker.location.streetAddress(),
        mobileNumber: faker.helpers.fromRegExp("+2347[0-9]{9}"), //.phone.number({ style: "international" })
        businessName: faker.helpers.arrayElement([faker.company.name(), null]),
        id: crypto.randomUUID(),
        role: "USER",
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

    const [userStatement, authStatement] = adminStatement;

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const admin: UserDto = {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      gender: faker.helpers.arrayElement(["M", "F"]),
      address: faker.location.streetAddress(),
      mobileNumber: faker.helpers.fromRegExp("+2347[0-9]{9}"), //.phone.number({ style: "international" })
      businessName: faker.helpers.arrayElement([faker.company.name(), null]),
      id: crypto.randomUUID(),
      role: "ADMIN",
      referrerCode: null
    };

    const adminAuth: Auth = {
      id: crypto.randomUUID(),
      nonce: "nonce",
      userId: admin.id,
      otpTTL: null,
      otp: null,
      hash: "$2b$10$3dCwdyc7U0BvZKCkPe5JWOgfLzEhhvVUOanVNz/cQXfu9SmvY.C2q" // hash for password
    };
    authStatement.run(adminAuth);
    userStatement.run(admin);
  });
  trx();

  const users = db.prepare<[], UserDto>("SELECT * FROM tblUsers").all();
  return users;
}

function seedFacilities() {
  const vals = ["Air Conditioning", "Swimming pool", "WiFi", "Laundry"];
  const statements = Array.from({ length: vals.length }).map(() => {
    const facilityStatement = db.prepare<CategoryDto[]>(`
      INSERT INTO tblFacilities (id, name, icon, color, comment)
      VALUES(@id, @name, @icon, @color, @comment)
    `);

    return facilityStatement;
  });

  const trx = db.transaction(() => {
    // const
    for (const statementIndex in statements) {
      const facility: FacilityDto = {
        id: faker.string.uuid(),
        name: vals[statementIndex],
        icon: faker.word.verb(),
        color: faker.color.human(),
        comment: faker.commerce.productDescription()
      };

      statements[statementIndex].run(facility);
    }
  });

  trx();

  const facilities = db
    .prepare<[], CategoryDto>("SELECT * FROM tblFacilities")
    .all();
  return facilities;
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
      const category: CategoryDto = {
        id: faker.string.uuid(),
        name: vals[statementIndex],
        comment: null
      };

      statements[statementIndex].run(category);
    }
  });

  trx();

  const categories = db
    .prepare<[], CategoryDto>("SELECT * FROM tblCategories")
    .all();
  return categories;
}

function seedListings(
  userIds: string[],
  categoryIds: string[],
  facilityIds: string[]
) {
  const statements = Array.from({ length: 30 }).map(() => {
    const listingStatement = db.prepare<
      Omit<ListingDto, "facilities" | "images">[]
    >(`
      INSERT INTO tblListings (id, name, address, type, status, description, price, rate, restrictions, userId, categoryId, images)
      VALUES(@id, @name, @address, @type, @status, @description, @price, @rate, @restrictions, @userId, @categoryId, @images)
    `);

    return listingStatement;
  });

  const facilitiesListingStatement = db.prepare<FacilityListing[]>(
    "INSERT INTO tblListingsFacilities (facilityId, listingId) VALUES (@facilityId, @listingId)"
  );

  const trx = db.transaction(() => {
    for (const statement of statements) {
      const listing: Merge<
        Omit<ListingDto, "images" | "facilities">,
        { images: string }
      > = {
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
        // facilities: faker.helpers.arrayElements(facilityIds),
        restrictions: null,
        rate: +faker.commerce.price(),
        price: +faker.commerce.price(),
        images: JSON.stringify(
          Array.from<string>({ length: 3 }).fill(faker.image.url())
        ),

        userId: faker.helpers.arrayElement(userIds),
        categoryId: faker.helpers.arrayElement(categoryIds)
      };

      statement.run(listing);
      faker.helpers.arrayElements(facilityIds).forEach((facilityId) => {
        facilitiesListingStatement.run({ facilityId, listingId: listing.id });
      });
    }
  });

  trx();

  const listings = db
    .prepare<[], ListingDto>("SELECT * FROM tblListings")
    .all();
  return listings;
}

function seedReservation(userIds: string[], listingIds: ListingDto[]) {
  const statements = Array.from({ length: 30 }).map(() => {
    const reservationStatement = db.prepare<ReservationDto[]>(`
      INSERT INTO tblReservations (id, code, amount, startDate, endDate, userId, listingId, listingOwnerId)
      VALUES(@id, @code, @amount, @startDate, @endDate, @userId, @listingId, @listingOwnerId)
    `);

    return reservationStatement;
  });

  const trx = db.transaction(() => {
    for (const statement of statements) {
      const listing = faker.helpers.arrayElement(listingIds);
      const reservation: ReservationDto = {
        id: faker.string.uuid(),
        code: faker.commerce.productName(),
        amount: +faker.commerce.price(),
        startDate: faker.date.soon().toISOString(),
        endDate: faker.date.soon().toISOString(),

        userId: faker.helpers.arrayElement(userIds),
        listingId: listing.id,
        listingOwnerId: listing.userId
      };

      statement.run(reservation);
    }
  });

  trx();

  const reservations = db
    .prepare<[], ReservationDto>("SELECT * FROM tblReservations")
    .all();
  return reservations;
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
  const facilities = skipForeignKeyConstraints(seedFacilities);

  const listings = skipForeignKeyConstraints(() => {
    return seedListings(
      users.map((u) => u.id),
      categories.map((c) => c.id),
      facilities.map((f) => f.id)
    );
  });

  const restrictions = skipForeignKeyConstraints(() => {
    return seedReservation(
      users.map((u) => u.id),
      listings
    );
  });

  return { users, categories, listings, restrictions };
}

main();
