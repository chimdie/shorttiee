import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware";
import { validator } from "../middlewares/validator.middleware";
import { CreateReservationDto } from "../dto/reservation.dto";
import { createReservationCtl } from "../controllers/reservation.ctl";
import { authorize } from "../middlewares/authorize.middleware";

export const reservationRouter = Router();

reservationRouter.use(authenticate);

reservationRouter
  .route("")
  .post(
    authorize("create", "reservation"),
    validator({ body: CreateReservationDto }),
    createReservationCtl
  );
