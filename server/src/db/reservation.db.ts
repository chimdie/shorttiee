import { ReservationDto } from "../dto/reservation.dto";
import { fnToResultAsync } from "../utils/fn-result";
import { queryToSql } from "../utils/request-query";
import { RequestQuery } from "../dto/query.dto";
import { DB } from "../config/db.config";
import { CreateReservation } from "../dto/types.dto";

export const createReservationQuery = async (payload: CreateReservation) => {
  const fn = fnToResultAsync(async () => {
    // const reservationStatement = db.prepare<ReservationDto[]>(`
    //   INSERT INTO tblReservations (id, code, amount, startDate, endDate, userId, listingId, listingOwnerId)
    //   VALUES(@id, @code, @amount, @startDate, @endDate, @userId, @listingId, @listingOwnerId)
    // `);
    // reservationStatement.run(payload);
    //
    // return db
    //   .prepare<
    //     string[],
    //     WithDBTimestamps<ReservationDto>
    //   >("SELECT * FROM tblReservations WHERE id = ?")
    //   .get(payload.id);

    return await DB.insertInto("tblReservations")
      .values(payload)
      .returningAll()
      .executeTakeFirst();
  });

  return await fn();
};

export const findReservationByIdQuery = async (id: string) => {
  const fn = fnToResultAsync(async () => {
    // const reservationStatement = db.prepare<string[], ReservationDto>(
    //   "SELECT * FROM tblReservations WHERE id = ?"
    // );
    //
    // return reservationStatement.get(id);

    return await DB.selectFrom("tblReservations")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  });

  return await fn();
};

export const findAllReservationByUserIdQuery = async (
  id: string,
  query: RequestQuery
) => {
  const fn = fnToResultAsync(async () => {
    // const sql = `
    //   SELECT  tblReservations.*, CONCAT(tblUsers.firstName, ' ' , tblUsers.lastName) as customerName, tblListings.name as apartmentName
    //   FROM tblReservations
    //   JOIN tblUsers on tblReservations.userId = tblUsers.id
    //   JOIN tblListings on tblReservations.listingId = tblListings.id
    //   WHERE (tblReservations.userId = ?  or tblReservations.listingOwnerId = ?) ${q ? "and " + q : q}
    // `;

    // const reservationStatement = db.prepare<unknown[], ReservationDto>(sql);
    // return reservationStatement.all([id, id, ...replacement]);

    // select "tblReservations".*
    // from "tblReservations"
    // inner join "tblUsers" on "tblReservations"."userId" = "tblUsers"."id"
    // inner join "tblListings" on "tblReservations"."listingId" = "tblListings"."id"
    // where "tblReservations"."userId" = ? and "tblReservations"."listingOwnerId" = ? and "code" = ?

    let stmt = DB.selectFrom("tblReservations")
      .innerJoin("tblUsers", "tblReservations.userId", "tblUsers.id")
      .innerJoin("tblListings", "tblReservations.listingId", "tblListings.id")
      // .where(, "=", id)
      .where((eb) =>
        eb.or([
          eb("tblReservations.userId", "=", id),
          eb("tblReservations.listingOwnerId", "=", id)
        ])
      )
      .selectAll("tblReservations")
      .select((eb) =>
        eb
          .fn<string>("concat", ["firstName", eb.val(" "), "lastName"])
          .as("customerName")
      );

    return await queryToSql(stmt, query.filter, query.or_filter).execute();
  });
  return await fn();
};

export const findReservationByIdAndUserIdQuery = async (
  id: string,
  userId: string
) => {
  const fn = fnToResultAsync(async () => {
    // const reservationStatement = db.prepare<unknown[], ReservationDto>(
    //   "SELECT * FROM tblReservations WHERE (userId = ?  or listingOwnerId = ?) and (id = ?) LIMIT 1"
    // );

    // return reservationStatement.get([userId, userId, id]);
    // console.log(
    //   ">>>sql",
    //   DB.selectFrom("tblReservations")
    //     .selectAll()
    //     .where((eb) => {
    //       return eb
    //         .or([eb("userId", "=", userId), eb("listingOwnerId", "=", userId)])
    //         .and(eb("id", "=", id));
    //     })
    //     .compile()
    // );
    return await DB.selectFrom("tblReservations")
      .selectAll()
      .where((eb) => {
        return eb
          .or([eb("userId", "=", userId), eb("listingOwnerId", "=", userId)])
          .and(eb("id", "=", id));
      })
      .executeTakeFirst();
  });

  return await fn();
};

const countReservations = async () => {
  const fn = fnToResultAsync(async () => {
    // const reservationStatement = db.prepare<[], { total: number }>(
    //   "SELECT count(*) as total FROM tblReservations"
    // );
    // return reservationStatement.get();

    return await DB.selectFrom("tblReservations")
      .select((eb) => eb.fn.countAll().as("total"))
      .executeTakeFirst();
  });

  return await fn();
};

export const createReservationCodeQuery = async () => {
  const [countError, count] = await countReservations();

  if (countError) {
    return [countError, null] as const;
  }

  const totalResevations = Number(count?.total ?? 0);
  let point: string = "";

  if (totalResevations < 100) {
    const totalStr = totalResevations.toString();
    point = "".padStart(3 - totalStr.length, "0");
  }

  const code = `RES-${point}${totalResevations + 1}`;
  return [null, code] as const;
};

export async function updateResvartionStatusQuery(
  id: string,
  userId: string,
  status: ReservationDto["status"]
) {
  // const sql = `
  //   UPDATE tblReservations
  //   SET status=@status
  //   WHERE id=@id AND listingOwnerId=@userId
  //   RETURNING *
  // `;

  const fn = fnToResultAsync(async () => {
    // return db
    //   .prepare<
    //     { id: string; userId: string; status: ReservationDto["status"] }[],
    //     ReservationDto
    //   >(sql)
    //   .get({ id, status, userId });

    return await DB.updateTable("tblReservations")
      .set({ status })
      .where("id", "=", id)
      .where("listingOwnerId", "=", userId)
      .returningAll()
      .executeTakeFirst();
  });

  return await fn();
}
