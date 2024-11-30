import { app } from "./app";
import { appEnv } from "./config/env.config";
import { CreateApplicationService } from "./config/services.config";
import { domainValidator } from "./utils/domain-validator";
import { OTP } from "./utils/otp";

new CreateApplicationService(app)
  .addService("otp", OTP)
  .addService("domainValidator", domainValidator)
  .build();
app.listen(appEnv.PORT);
