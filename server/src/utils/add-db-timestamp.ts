import { CreateTableBuilder, sql } from "kysely";
import { appEnv } from "../config/env.config";

export function addDbTimestamp<T extends string>(
  tableBuilder: CreateTableBuilder<T>
) {
  if (appEnv.APP_ENV === "test" || appEnv.APP_ENV === "development") {
    tableBuilder.addColumn("createdAt", "datetime", (col) => {
      return col.defaultTo(sql`STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')`);
    });
  }

  if (appEnv.APP_ENV === "staging" || appEnv.APP_ENV === "production") {
    tableBuilder.addColumn("createdAt", "timestamptz", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`)
    );
  }

  return tableBuilder;
}

export function timestamp() {
  if (appEnv.APP_ENV === "test" || appEnv.APP_ENV === "development") {
    return "STRFTIME('%Y-%m-%dT%H:%M:%fZ', 'NOW')";
  }

  if (appEnv.APP_ENV === "staging" || appEnv.APP_ENV === "production") {
    return "CURRENT_TIMESTAMP";
  }
}
