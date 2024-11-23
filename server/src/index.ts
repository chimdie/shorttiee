import { app } from "./app";
import { appEnv } from "./config/env.config";
import { OTP } from "./utils/otp";

app.locals.otp = OTP;

app.listen(appEnv.PORT ?? 4000);
