import http from "http";
import debug from "debug";
import { app } from "./app";
import { appEnv } from "./config/env.config";
import { CreateApplicationService } from "./config/services.config";
import { domainValidator } from "./utils/domain-validator";
import { OTP } from "./utils/otp";
import { DB } from "./config/db.config";
import { AppEventEmitter } from "./config/events";
import assert from "assert";
import { createAdmin } from "./db/users.db";

new CreateApplicationService(app)
  .addService("otp", OTP)
  .addService("domainValidator", domainValidator)
  .addService("event", AppEventEmitter)
  .build();

// if (!isAllDBTableMigrated()) {
//   debug("app:db")("Tables not fully migrated");
//   process.exit(1);
// }

const server = http.createServer(app);

function serverListen(server: http.Server) {
  server.listen(appEnv.PORT, async () => {
    const [err] = await createAdmin();
    if (err) {
      debug("app:db:createAdmin")(err);
    }
  });
}

serverListen(server);

server.on("error", (e) => {
  assert("code" in e);
  if (e.code === "EADDRINUSE") {
    console.error("Address in use, retrying...");
    setTimeout(() => {
      server.close();
      serverListen(server);
    }, 1000);
  }
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
process.on("exit", shutDown);

server.on("connection", () => {
  // console.log("connection");
});

function shutDown(code: number) {
  debug("app:shutDown")("CODE: " + code);
  debug("app:shutDown")("Received kill signal, shutting down gracefully");

  server.close(async () => {
    debug("app:shutDown")("Closed out remaining connections");
    await DB.destroy();
    process.exit(0);
  });
}
