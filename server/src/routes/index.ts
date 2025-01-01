import "../docs";
import { Router } from "express";
import { docsRouter } from "./docs.routes";
import { authRouter } from "./auth.routes";
import { categoryRouter } from "./category.routes";
import { listingsRouter } from "./listing.routes";
import { filesRouter } from "./files.routes";
import { facilityRouter } from "./facility.routes";
import { userRouter } from "./user.routes";
import { reservationRouter } from "./reservation.routes";

export const apiV1router = Router();

apiV1router.use("/docs", docsRouter);
apiV1router.use("/auth", authRouter);
apiV1router.use("/users", userRouter);

apiV1router.use("/files", filesRouter);
apiV1router.use("/facilities", facilityRouter);
apiV1router.use("/categories", categoryRouter);
apiV1router.use("/listings", listingsRouter);
apiV1router.use("/reservations", reservationRouter);
