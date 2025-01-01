import db from "../config/db.config";
import { ReservationDto } from "../dto/reservation.dto";
import { WithDBTimestamps } from "../types/utils";
import { fnToResult } from "../utils/fn-result";

export const createReservationQuery = (payload: ReservationDto) => {
  return fnToResult(() => {
    const reservationStatement = db.prepare<ReservationDto[]>(`
      INSERT INTO tblReservations (id, code, amount, startDate, endDate, userId, listingId)
      VALUES(@id, @code, @amount, @startDate, @endDate, @userId, @listingId)
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
  return fnToResult(() => {
    const reservationStatement = db.prepare<string[]>(`
      SELECT * FROM tblReservations WHERE id = ?
		`);

    return reservationStatement.get(id);
  });
};

const countReservations = () => {
  return fnToResult(() => {
    const reservationStatement = db.prepare<[], { total: number }>(`
			SELECT count(*) as total FROM tblReservations
    `);

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
