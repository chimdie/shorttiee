import { Router } from "express";
import {
  createReservationCtl,
  getAllReservationCtl,
  getReservationCtl
} from "../../controllers/reservation.ctl";
import { CreateReservationDto } from "../../dto/reservation.dto";
import { authenticate } from "../../middlewares/authenticate.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { validator } from "../../middlewares/validator.middleware";
import { RequestQuery } from "../../dto/query.dto";
import {
  createReservationsDocs,
  getAllReservationsDocs,
  getReservationDocs
} from "../../docs/reservation.docs";
import { IdDto } from "../../dto/util.dto";

export const reservationRouter = Router();

reservationRouter.use(authenticate);

reservationRouter
  .route("/")
  .post(
    createReservationsDocs,
    authorize("create", "reservation"),
    validator({ body: CreateReservationDto }),
    createReservationCtl
  )
  .get(
    getAllReservationsDocs,
    authorize("read", "reservation"),
    validator({ query: RequestQuery }),
    getAllReservationCtl
  );

reservationRouter.get(
  "/:id",
  getReservationDocs,
  authorize("read", "reservation"),
  validator({ params: IdDto }),
  getReservationCtl
);
