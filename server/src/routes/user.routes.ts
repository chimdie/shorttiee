import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware";
import {
  getUserProfileCtl,
  updateUserProfileCtl
} from "../controllers/user.ctl";
import { validator } from "../middlewares/validator.middleware";
import { UpdateUserDto } from "../dto/user.dto";
import { getUserProfileDoc, patchUserProfileDoc } from "../docs/user.docs";

export const userRouter = Router();

userRouter.use(authenticate);

// TODO: Docs for profile
userRouter
  .route("/profile")
  .get(getUserProfileDoc, getUserProfileCtl)
  .patch(
    patchUserProfileDoc,
    validator({ body: UpdateUserDto }),
    updateUserProfileCtl
  );
