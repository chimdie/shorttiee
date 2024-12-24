import { CompoundCondition, FieldCondition } from "@ucast/core";
import {
  createSqlInterpreter,
  allInterpreters,
  sqlite,
  SqlOperator
} from "@ucast/sql";

function manyParamsOperator(
  name: string
): SqlOperator<FieldCondition<unknown[]>> {
  return (condition, query) => {
    const params = query.manyParams(condition.value);

    return query.whereRaw(
      `${query.field(condition.field)} ${name} ${params[0]} and ${params[1]} `,
      ...condition.value
    );
  };
}

const between = manyParamsOperator("between");
const notBetween = manyParamsOperator("not between");

const like: SqlOperator<FieldCondition> = (node, query) => {
  return query.where(node.field, node.operator, node.value);
};

const interpret = createSqlInterpreter({
  ...allInterpreters,
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
