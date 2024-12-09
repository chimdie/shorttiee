import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getUserProfile, updateUserProfile } from "../controllers/user.ctl";
import { validator } from "../middlewares/validator.middleware";
import { UpdateUserDto } from "../dto/user.dto";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter
  .route("/profile")
  .get(getUserProfile)
  .patch(validator({ body: UpdateUserDto }), updateUserProfile);
