import debug from "debug";
import { app } from "./app";
import { appEnv } from "./config/env.config";
import { CreateApplicationService } from "./config/services.config";
import { domainValidator } from "./utils/domain-validator";
import { OTP } from "./utils/otp";
import { db } from "./config/db.config";

new CreateApplicationService(app)
  .addService("otp", OTP)
  .addService("domainValidator", domainValidator)
  .build();
const server = app.listen(appEnv.PORT);

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
process.on("exit", shutDown);

server.on("connection", () => {
  console.log("connection");
});

function shutDown() {
  debug("app:shutDown")("Received kill signal, shutting down gracefully");

  server.close(() => {
    debug("app:shutDown")("Closed out remaining connections");
    db.close();
    process.exit(0);
  });
}
