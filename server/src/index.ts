import { app } from "./app";
import { appEnv } from "./config/env.config";
import { CreateApplicationService } from "./config/services.config";
import { OTP } from "./utils/otp";

new CreateApplicationService(app)
  .addService("otp", OTP)
  .build()
  .listen(appEnv.PORT ?? 4000);
