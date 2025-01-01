import { Router } from "express";
import { createReservationCtl } from "../../controllers/reservation.ctl";
import { CreateReservationDto } from "../../dto/reservation.dto";
import { authenticate } from "../../middlewares/authenticate.middleware";
import { authorize } from "../../middlewares/authorize.middleware";
import { validator } from "../../middlewares/validator.middleware";

export const reservationRouter = Router();

reservationRouter.use(authenticate);

reservationRouter
  .route("/")
  .post(
    authorize("create", "reservation"),
    validator({ body: CreateReservationDto }),
    createReservationCtl
  );
