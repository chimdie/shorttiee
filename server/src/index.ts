import assert from "assert";
import debug from "debug";
import http from "http";
import { app } from "./app";
import { DB } from "./config/db.config";
import { appEnv } from "./config/env.config";
import { AppEventEmitter } from "./config/events";
import { CreateApplicationService } from "./config/services.config";
import { createAdmin } from "./db/users.db";
import { domainValidator } from "./utils/domain-validator";
import { OTP } from "./utils/otp";

const ShorttieeServer = new CreateApplicationService(app)
  .addService("otp", OTP)
  .addService("domainValidator", domainValidator)
  .addService("event", AppEventEmitter)
  .build();

// if (!isAllDBTableMigrated()) {
//   debug("app:db")("Tables not fully migrated");
//   process.exit(1);
// }

function serverListen(server: http.Server) {
  server.listen(appEnv.PORT, async () => {
    const [err] = await createAdmin();
    if (err) {
      debug("app:db:createAdmin")(err);
    }
  });
}

serverListen(ShorttieeServer);

ShorttieeServer.on("error", (e) => {
  assert("code" in e);
  if (e.code === "EADDRINUSE") {
    console.error("Address in use, retrying...");
    setTimeout(() => {
      ShorttieeServer.close();
      serverListen(ShorttieeServer);
    }, 1000);
  }
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
process.on("exit", shutDown);

ShorttieeServer.on("connection", () => {
  // console.log("connection");
});

function shutDown(code: number) {
  debug("app:shutDown")("CODE: " + code);
  debug("app:shutDown")("Received kill signal, shutting down gracefully");

  ShorttieeServer.close(async () => {
    debug("app:shutDown")("Closed out remaining connections");
    await DB.destroy();
    process.exit(0);
  });
}
