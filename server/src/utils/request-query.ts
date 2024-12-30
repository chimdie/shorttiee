import { CompoundCondition, FieldCondition } from "@ucast/core";
import {
  createSqlInterpreter,
  allInterpreters,
  sqlite,
  SqlOperator
} from "@ucast/sql";
import assert from "node:assert";

function manyParamsOperator(
  name: string
): SqlOperator<FieldCondition<unknown[]>> {
  return (condition, query) => {
    assert(
      Array.isArray(condition.value),
      `Expected array for '${condition.operator}' operator but got ${typeof condition.value}`
    );

    const params = query.manyParams(condition.value);

    return query.whereRaw(
      `${query.field(condition.field)} ${name} ${params[0]} and ${params[1]} `,
      ...condition.value
    );
  };
}

const between = manyParamsOperator("between");
const notBetween = manyParamsOperator("not between");

function manyInParamsOperator(
  name: string
): SqlOperator<FieldCondition<unknown[]>> {
  return (condition, query) => {
    assert(
      Array.isArray(condition.value),
      `Expected array for '${condition.operator}' operator but got ${typeof condition.value}`
    );

    return query.whereRaw(
      `${query.field(condition.field)} ${name}(${query.manyParams(condition.value).join(", ")})`,
      ...condition.value
    );
  };
}

export const within = manyInParamsOperator("in");
export const nin = manyInParamsOperator("not in");

const like: SqlOperator<FieldCondition> = (node, query) => {
  return query.where(node.field, node.operator, node.value);
};

const interpret = createSqlInterpreter({
  ...allInterpreters,
  in: within,
  nin: nin,
  like,
  between,
  "not like": like,
  "not between": notBetween
});

export function queryToSql(
  filter: any[] = [],
  or_filter: any[] = [],
  shift: boolean = true
) {
  if (!filter.length && !or_filter.length) {
    return ["", []];
  }

  const conditons = [];

  if (filter.length) {
    const andConditions = new CompoundCondition("and", filter.map(filterMap));
    conditons.push(andConditions);
  }

  if (or_filter.length) {
    const orConditions = new CompoundCondition("or", or_filter.map(filterMap));
    conditons.push(orConditions);
  }

  const res = interpret(
    new CompoundCondition(shift ? "or" : "and", conditons),
    {
      ...sqlite,
      joinRelation: () => false
    }
  );

  res[0] = "WHERE " + res[0];
  // res[0] = res[0].replace(/`/g, "");

  return res;
}

function filterMap(_q: unknown[]) {
  const query = _q as [string, string, string | string[]];
  const field = query[0];
  const operator = query[1];
  const value = query[2];
  return new FieldCondition(operator, field, value);
}
