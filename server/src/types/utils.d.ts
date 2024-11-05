type Unite<T> =
  T extends Record<string, unknown> ? { [Key in keyof T]: T[Key] } : T;

type StrictEquals<A1, A2> =
  (<A>() => A extends A2 ? true : false) extends <A>() => A extends A1
    ? true
    : false
  ? true
  : false;

export type Equals<A1, A2> = StrictEquals<Unite<A1>, Unite<A2>>;

interface _WithDBTimestamps<T extends Record<string, any>> extends T {
  createdAt: string;
  updatedAt: string;
}

export type WithDBTimestamps<
  T extends Record<string, any>,
  U = _WithDBTimestamps<T>
> = {
    [k in keyof U]: U[k];
  };
