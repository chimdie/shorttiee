import { Router } from "express";
import {
  getUserProfileCtl,
  updateUserProfileCtl
} from "../../controllers/user.ctl";
import { getUserProfileDoc, patchUserProfileDoc } from "../../docs/user.docs";
import { UpdateUserDto } from "../../dto/user.dto";
import { authenticate } from "../../middlewares/authenticate.middleware";
import { validator } from "../../middlewares/validator.middleware";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter
  .route("/profile")
  .get(getUserProfileDoc, getUserProfileCtl)
  .patch(
    patchUserProfileDoc,
    validator({ body: UpdateUserDto }),
    updateUserProfileCtl
  );
