import assert from "node:assert";
import { SelectQueryBuilder } from "kysely";

export function queryToSql<DB, TB extends keyof DB, O>(
  stmt: SelectQueryBuilder<DB, TB, O>,
  filter: any[] = [],
  or_filter: any[] = []
  // shift: boolean = true,
  // prefix: boolean = true
) {
  if (filter?.length) {
    return filter.reduce((acc, f) => {
      const [field, op, val] = f;
      return acc.where(field as any, op, val);
    }, stmt) as typeof stmt;
  }

  if (or_filter?.length) {
    return stmt.where((eb: any) => {
      assert(or_filter);
      return eb.or(
        or_filter?.map((f) => {
          const [field, op, val] = f;
          return eb(field as any, op, val);
        })
      );
    });
  }

  return stmt;
}
