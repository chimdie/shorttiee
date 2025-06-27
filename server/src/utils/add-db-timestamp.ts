import { CreateTableBuilder, sql } from "kysely";

export function addDbTimestamp<T extends string, U extends string>(
  tableBuilder: CreateTableBuilder<T, U>
) {
  return tableBuilder
    .addColumn("createdAt", "timestamptz", (col) => {
      return col.defaultTo(sql`CURRENT_TIMESTAMP`);
    })
    .addColumn("updatedAt", "timestamptz", (col) => {
      return col.defaultTo(sql`CURRENT_TIMESTAMP`);
    });
}

function _timestamp() {
  return "CURRENT_TIMESTAMP";
}
