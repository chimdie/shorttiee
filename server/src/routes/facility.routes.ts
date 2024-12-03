import { Router } from "express";
import { validator } from "../middlewares/validator.middleware";
import { CreateFacilityDto } from "../dto/facility.dto";
import {
  createFacilityCtl,
  getAllFacilityCtl,
  getFacilityCtl
} from "../controllers/facility.ctl";
import { authenticate } from "../middlewares/auth.middleware";
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
