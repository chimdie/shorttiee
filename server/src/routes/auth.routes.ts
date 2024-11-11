import { Router } from "express";
import {
  changePasswordDocs,
  forgotPasswordDocs,
  loginDoc,
  registerDoc,
  resetPasswordDocs
} from "../docs/auth.docs";
import {
  changePasswordCtl,
  forgetPasswordCtl,
  loginCtl,
  registerCtl,
  resetPasswordCtl
} from "../controllers/auth.ctl";
import { validator } from "../middlewares/validator.middleware";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto
} from "../dto/auth.dto";

export const authRouter = Router();

authRouter.post(
  "/register",
  validator({ body: RegisterDto }),
  registerDoc,
  registerCtl
);

authRouter.post("/login", validator({ body: LoginDto }), loginDoc, loginCtl);

authRouter.post(
  "/forgot-password",
  validator({ body: ForgotPasswordDto }),
  forgotPasswordDocs,
  forgetPasswordCtl
);

authRouter.post(
  "/reset-password",
  validator({ body: ResetPasswordDto }),
  resetPasswordDocs,
  resetPasswordCtl
);

authRouter.post(
  "/change-password",
  validator({ body: ChangePasswordDto }),
  changePasswordDocs,
  changePasswordCtl
);
