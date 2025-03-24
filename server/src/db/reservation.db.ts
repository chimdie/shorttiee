import db from "../config/db.config";
import { ReservationDto } from "../dto/reservation.dto";
import { WithDBTimestamps } from "../types/utils";
import { fnToResult } from "../utils/fn-result";
import { queryToSql } from "../utils/request-query";
import { RequestQuery } from "../dto/query.dto";

export const createReservationQuery = (payload: ReservationDto) => {
  return fnToResult(() => {
    const reservationStatement = db.prepare<ReservationDto[]>(`
      INSERT INTO tblReservations (id, code, amount, startDate, endDate, userId, listingId, listingOwnerId)
      VALUES(@id, @code, @amount, @startDate, @endDate, @userId, @listingId, @listingOwnerId)
    `);
    reservationStatement.run(payload);

    return db
      .prepare<
        string[],
        WithDBTimestamps<ReservationDto>
      >("SELECT * FROM tblReservations WHERE id = ?")
      .get(payload.id);
  })();
};

export const findReservationByIdQuery = (id: string) => {
  const fn = fnToResult(() => {
    const reservationStatement = db.prepare<string[], ReservationDto>(
      "SELECT * FROM tblReservations WHERE id = ?"
    );

    return reservationStatement.get(id);
  });

  return fn();
};

export const findAllReservationByUserIdQuery = (
  id: string,
  query: RequestQuery
) => {
  return fnToResult(() => {
    const [q, replacement] = queryToSql(
      query.filter,
      query.or_filter,
      query.shift,
      false
    );

    const sql = `
      SELECT  tblReservations.*, CONCAT(tblUsers.firstName, ' ' , tblUsers.lastName) as customerName, tblListings.name as apartmentName
      FROM tblReservations 
      JOIN tblUsers on tblReservations.userId = tblUsers.id
      JOIN tblListings on tblReservations.listingId = tblListings.id
      WHERE (tblReservations.userId = ?  or tblReservations.listingOwnerId = ?) ${q ? "and " + q : q}
    `;

    const reservationStatement = db.prepare<unknown[], ReservationDto>(sql);

    return reservationStatement.all([id, id, ...replacement]);
  })();
};

export const findReservationByIdAndUserIdQuery = (
  id: string,
  userId: string
) => {
  return fnToResult(() => {
    const reservationStatement = db.prepare<unknown[], ReservationDto>(
      "SELECT * FROM tblReservations WHERE (userId = ?  or listingOwnerId = ?) and (id = ?) LIMIT 1"
    );

    return reservationStatement.get([userId, userId, id]);
  })();
};

const countReservations = () => {
  return fnToResult(() => {
    const reservationStatement = db.prepare<[], { total: number }>(
      "SELECT count(*) as total FROM tblReservations"
    );

    return reservationStatement.get();
  })();
};

export const createReservationCodeQuery = () => {
  const [countError, count] = countReservations();

  if (countError) {
    return [countError, null] as const;
  }

  const totalResevations = count?.total ?? 0;
  let point: string = "";

  if (totalResevations < 100) {
    const totalStr = totalResevations.toString();
    point = "".padStart(3 - totalStr.length, "0");
  }

  const code = `RES-${point}${totalResevations + 1}`;
  return [null, code] as const;
};

export function updateResvartionStatusQuery(
  id: string,
  userId: string,
  status: ReservationDto["status"]
) {
  const sql = `
    UPDATE tblReservations
    SET status=@status
    WHERE id=@id AND listingOwnerId=@userId
    RETURNING *
  `;

  const fn = fnToResult(() => {
    return db
      .prepare<
        { id: string; userId: string; status: ReservationDto["status"] }[],
        ReservationDto
      >(sql)
      .get({ id, status, userId });
  });

  return fn();
}
