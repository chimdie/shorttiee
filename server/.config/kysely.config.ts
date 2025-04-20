import {
  DummyDriver,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler
} from "kysely";
import { defineConfig } from "kysely-ctl";
import { DB } from "../src/config/db.config";

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  kysely: DB,
  migrations: {
    migrationFolder: "db/migrations"
  },
  //   plugins: [],
  seeds: {
    seedFolder: "db/seeds"
  }
});
