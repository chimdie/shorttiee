import { Router } from "express";
import { validator } from "../middlewares/validator.middleware";
import { CreateFacilityDto } from "../dto/facility.dto";
import {
  createFacilityCtl,
  getAllFacilityCtl,
  getFacilityCtl
} from "../controllers/facility.ctl";
import { authenticate } from "../middlewares/authenticate.middleware";
import { authorize } from "../middlewares/authorize.middleware";
import { IdDto } from "../dto/util.dto";
import {
  createFacilityDoc,
  getAllFacilityDoc,
  getFacilityDoc
} from "../docs/facility.docs";

export const facilityRouter = Router();

facilityRouter.post(
  "/",
  createFacilityDoc,
  authenticate,
  authorize("create", "facility"),
  validator({ body: CreateFacilityDto }),
  createFacilityCtl
);

facilityRouter.get("/", getAllFacilityDoc, getAllFacilityCtl);
facilityRouter.get(
  "/:id",
  getFacilityDoc,
  validator({ params: IdDto }),
  getFacilityCtl
);
